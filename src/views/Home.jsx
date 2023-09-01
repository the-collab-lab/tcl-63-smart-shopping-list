import { generateToken } from '@the-collab-lab/shopping-list-utils';
import Button from '../components/Button';
import './Home.css';
import { useState, useRef } from 'react';
import { addNewListToFirestore, useShoppingListData } from '../api/firebase';
import { sanitizeInput } from '../utils/sanitizeInput';

export function Home({ setListToken }) {

	// CREATE A REFERENCE TO THE TOKEN INPUT IN ORDER TO DIRECT FOCUS TO IT AFTER IT'S CLEARED
	const tokenInputRef = useRef(null)
	
	const [tokenInput, setTokenInput] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	
	
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

	// IMPORT useShoppingListData FROM Firebase.js TO TEST WHETHER THE tokenInput IS VALID
	const sharedListData = useShoppingListData(tokenInput)

	const submitTokenInput = (event) => {
		event.preventDefault();
		
		if(tokenInput.trim() === "") {
			setErrorMessage("Please, enter 3-word token.");
			setTimeout(() => {
				setErrorMessage("");
			}, 7000);
			return;
		} 

		if(sharedListData.length === 0) {
			setErrorMessage("The list does not exist. Please try again.");
			setTimeout(() => {
				setErrorMessage("");
			}, 7000);
			return;
		} 

		setListToken(tokenInput)
	}

	const handleInputChange = (event) => {
		const sanitizedInput = sanitizeInput(event.target.value);
		setTokenInput(sanitizedInput);
	};
	  

	// This function resets the token input and keeps focus on the input field
	const clearTokenInput = () => {
		setTokenInput('');
		tokenInputRef.current.focus();
	}

	return (
		<div className="Home">
			<Button label="Create New List" onClick={createNewList} />
			<p>-or-</p>
			<p>Join an existing shopping list by entering a three word token.</p>

			<form onSubmit={submitTokenInput}>
				<label htmlFor="tokenInput">
				Enter token:
				<br />
					<input
						type="text"
						name="tokenInput"
						id="tokenInput"
						value={tokenInput}
						onChange={handleInputChange}
						ref={tokenInputRef}
					/>
					
				</label>
				<Button label="X" type="reset" ariaLabel="Clear token input" onClick={clearTokenInput}/>
				<br />
				<Button label="Join" type="submit" ariaLabel="Join shared shopping list"/>
			</form>
			
			<div aria-live="polite">
				{errorMessage && <p>{errorMessage}</p>}
			</div>
		</div>
	);
}

