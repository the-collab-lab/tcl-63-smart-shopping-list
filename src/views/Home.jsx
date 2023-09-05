import { generateToken } from '@the-collab-lab/shopping-list-utils';
import Button from '../components/Button';
import './Home.css';
import { useState, useRef } from 'react';
import { addNewListToFirestore, useShoppingListData } from '../api/firebase';

export function Home({ setListToken }) {

	// CREATE A REFERENCE TO THE TOKEN INPUT IN ORDER TO DIRECT FOCUS TO IT AFTER IT'S CLEARED
	const tokenInputRef = useRef(null)
	
	const [tokenInput, setTokenInput] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [isTokenValid, setIsTokenValid] = useState(false)
	
	
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
		setTokenInput(tokenInput);

		const tokenWords = tokenInput.split(' ').filter(word => word !== '');
		setIsTokenValid(tokenWords.length === 3);

		if (/[^a-zA-Z\s]/.test(tokenInput)) {
			setErrorMessage("Please use only letters!");
			setIsTokenValid(false);
			setTimeout(() => {
				setErrorMessage("");
			}, 5000);
		}
	};
	  

	// This function resets the token input and keeps focus on the input field
	const clearTokenInput = () => {
		setTokenInput('');
		tokenInputRef.current.focus();
	}

	// IMPORT useShoppingListData FROM Firebase.js TO TEST WHETHER THE tokenInput IS VALID

	const token = tokenInput.trim().toLowerCase()
	const sharedListData = useShoppingListData(token)

	const submitTokenInput = (event) => {
		event.preventDefault();

		if(sharedListData.length === 0) {
			setErrorMessage("The list does not exist. Please try again.");
			setTimeout(() => {
				setErrorMessage("");
			}, 7000);
			return;
		} 

		setListToken(token)
	}

	const handleEnterKey = (event) => {
		if (event.key === "Enter") {
			event.preventDefault()
			if (!isTokenValid) {
				setErrorMessage('A token must contain exactly three words separated by a space.')
				setTimeout(() => {
					setErrorMessage("");
				}, 7000);
			} else {
				submitTokenInput(event)
			}
		}
	}
	

	return (
		<div className="Home">
			<Button label="Create New List" onClick={createNewList} />
			<p>-or-</p>
			<p>Join an existing shopping list.</p>

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
					/>
					
				</label>
				<Button label="X" type="reset" ariaLabel="Clear token input" onClick={clearTokenInput}/>
				<br />
				<Button 
					label="Join" 
					type="submit" 
					ariaLabel="Join shared shopping list"
					isDisabled={!isTokenValid}
				/>
			</form>
			
			<div aria-live="polite">
				{errorMessage && <p>{errorMessage}</p>}
			</div>
		</div>
	);
}

