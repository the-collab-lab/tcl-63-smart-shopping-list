import { generateToken } from '@the-collab-lab/shopping-list-utils';
import Button from '../components/Button';
import ClearButton from '../components/ClearButton';
import './Home.css';
import { useState, useRef } from 'react';
import { addNewListToFirestore, useShoppingListData } from '../api/firebase';
import { ToastContainer, toast, Slide } from 'react-toastify';

export function Home({ setListToken }) {
	// CREATE A REFERENCE TO THE TOKEN INPUT IN ORDER TO DIRECT FOCUS TO IT AFTER IT'S CLEARED
	const tokenInputRef = useRef(null);

	const [tokenInput, setTokenInput] = useState('');
	const [isTokenValid, setIsTokenValid] = useState(false);
	// NEW LIST IS ADDED TO FIREBASE
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
			toast.error('Please use only letters!');
			setIsTokenValid(false);
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
			toast.error('The list does not exist. Please try again.');
			return;
		}
		setListToken(token);
	};

	return (
		<div className="Home flex flex-col items-center pt-10 text-center gap-6">
			<p>Friends who shop together, stay together!</p>
			<Button label="Create New List" onClick={createNewList} />
			<div className="divider before:bg-secondary after:bg-secondary">OR</div>
			<p className="font-bold text-3xl">Join an existing shopping list</p>
			<form onSubmit={submitTokenInput} className="flex flex-col items-center">
				<label htmlFor="tokenInput">
					Enter a 3-word token (example: "word word word"):
				</label>
				<div className="flex items-center my-6 w-full justify-center">
					<input
						type="text"
						name="tokenInput"
						id="tokenInput"
						value={tokenInput}
						onChange={handleInputChange}
						ref={tokenInputRef}
						className="input input-bordered input-primary input-lg text-2xl w-full max-w-sm mr-2 ml-[10%]"
					/>
					<ClearButton
						label="X"
						type="reset"
						ariaLabel="Clear token input"
						onClick={clearTokenInput}
					/>
				</div>
				<Button
					label="Join Existing List"
					type="submit"
					ariaLabel="Join shared shopping list"
				/>
			</form>
			{/* Prompt users with alert message, including for screen reader users */}
			<ToastContainer position="top-center" transition={Slide} />
		</div>
	);
}
