import { generateToken } from '@the-collab-lab/shopping-list-utils';
import Button from '../components/Button';
import './Home.css';
import { useState } from 'react';
import { useShoppingListData } from '../api/firebase';

export function Home({ setListToken }) {
	//This function generates a new unique Token corresponding to a new shopping list.

	const [tokenInput, setTokenInput] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	
	const createNewList = () => {
		const newToken = generateToken();
		setListToken(newToken);
	};

	const sharedListData  = useShoppingListData(tokenInput)

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
			setErrorMessage("The list does not exist or it is empty");
			setTimeout(() => {
				setErrorMessage("");
			}, 7000);
			return;
		} 

		setListToken(tokenInput)
	}

	const handleInputChange = (event) => {
		setTokenInput(event.target.value);
	}

	return (
		<div className="Home">
			<Button label="Create New List" onClick={createNewList} />
			<p>-or-</p>
			<p>Join an existing shopping list by entering a three word token.</p>

			<form onSubmit={submitTokenInput}>
				<label htmlFor="tokenInput">
				Enter token:
					<input
						type="text"
						name="tokenInput"
						id="tokenInput"
						value={tokenInput}
						onChange={handleInputChange}
					/>
					
				
				</label>
				
				<Button label="Join" />
			</form>
			<div aria-live="polite">
				{errorMessage && <p>{errorMessage}</p>}
			</div>
		</div>
	);
}
