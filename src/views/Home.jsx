import { generateToken } from '@the-collab-lab/shopping-list-utils';
import Button from '../components/Button';
import ClearButton from '../components/ClearButton';
import './Home.css';
import { useState, useRef } from 'react';
import { addNewListToFirestore, useShoppingListData } from '../api/firebase';

export function Home({ setListToken }) {
	// CREATE A REFERENCE TO THE TOKEN INPUT IN ORDER TO DIRECT FOCUS TO IT AFTER IT'S CLEARED
	const tokenInputRef = useRef(null);

	const [tokenInput, setTokenInput] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const [isTokenValid, setIsTokenValid] = useState(false);

	// OPTION: A - NEW (EMPTY) LIST IS ONLY SAVED TO LOCAL STORAGE
	// IT IS ADDED TO FIREBASE ONLY WHEN THE FIRST ITEM IS ADDED TO THE LIST
	// FUNCTION INHERITED FROM PR TO ISSUE #3
	// const createNewList = () => {
	// 	const newToken = generateToken();
	// 	setListToken(newToken);
	// };

	// OPTION: B - NEW LIST IS ADDED TO FIREBASE (GOES WITH OPTION B IN Firebase.js and OPTION B IN List.jsx)
	// IT USES THE FUNCTION addNewListToFirestore FROM Firebase.js WHICH ADDS A NEW LIST CONTAINING AN EMPTY DOC
	const createNewList = async () => {
		const newToken = generateToken();
		try {
			await addNewListToFirestore(newToken);
			setListToken(newToken);
		} catch (error) {
			console.error(error);
		}
	};

	const handleInputChange = (event) => {
		const tokenInput = event.target.value;

		// test for a three-word token
		const tokenWords = tokenInput.split(' ').filter((word) => word !== '');
		setIsTokenValid(tokenWords.length === 3);

		// test for all non-letter characters;
		if (/[^a-zA-Z\s]/.test(tokenInput)) {
			setErrorMessage('Please use only letters!');
			setIsTokenValid(false);
			setTimeout(() => {
				setErrorMessage('');
			}, 7000);
		}
		setTokenInput(tokenInput);
	};

	// This function resets the token input and keeps focus on the input field
	const clearTokenInput = () => {
		setTokenInput('');
		tokenInputRef.current.focus();
	};

	// trim spaces at both ends of the token; keep only one space between words; turn all letters to lower case
	const token = tokenInput.trim().replace(/\s+/g, ' ').toLowerCase();
	// allow calls to Firebase only if the token is valid
	const sharedListData = useShoppingListData(isTokenValid ? token : null);

	const submitTokenInput = (event) => {
		event.preventDefault();

		if (sharedListData.length === 0) {
			setErrorMessage('The list does not exist. Please try again.');
			setTimeout(() => {
				setErrorMessage('');
			}, 7000);
			return;
		}

		setListToken(token);
	};

	const handleEnterKey = (event) => {
		if (event.key === 'Enter') {
			event.preventDefault();
			if (!isTokenValid) {
				setErrorMessage(
					'A token must contain exactly three words separated by a space.',
				);
				setTimeout(() => {
					setErrorMessage('');
				}, 7000);
			} else {
				submitTokenInput(event);
			}
		}
	};

	return (
		<div className="Home h-screen flex flex-col items-center pt-4">
			<Button label="Create New List" onClick={createNewList} />
			<p>-or-</p>
			<p className="font-bold">Join an existing shopping list.</p>

			<form onSubmit={submitTokenInput}>
				<label htmlFor="tokenInput">
					Enter a 3-word token (example: "word word word"):
					<br />
					<input
						type="text"
						name="tokenInput"
						id="tokenInput"
						value={tokenInput}
						onChange={handleInputChange}
						onKeyDown={handleEnterKey}
						ref={tokenInputRef}
						className="input input-bordered input-primary w-full max-w-xs mr-2 my-2"
					/>
				</label>
				<ClearButton
					label="X"
					type="reset"
					ariaLabel="Clear token input"
					onClick={clearTokenInput}
				/>

				<br />
				<Button
					label="Join"
					type="submit"
					ariaLabel="Join shared shopping list"
					isDisabled={!isTokenValid}
				/>
			</form>

			<div aria-live="polite">{errorMessage && <p>{errorMessage}</p>}</div>
		</div>
	);
}
