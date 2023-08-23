import { generateToken } from '@the-collab-lab/shopping-list-utils';
import Button from '../components/Button';
import './Home.css';
import { useState } from 'react';
// import { createCollection } from '../api/firebase';

export function Home({ setListToken }) {
	const [retrievedToken, setRetrievedToken] = useState('');

	/**
	 * This function generates a new unique Token corresponding to a new shopping list.
	 */
	const createNewList = () => {
		const newToken = generateToken();
		setListToken(newToken);

		/**
		 * We were creating a new collection in the database using the newToken:
		 * createCollection(newToken);
		 */
	};

	/**
	 *  This function ensures that the retrievedToken state always reflects the current value in the input field.
	 */
	const handleTokenInput = (e) => {
		setRetrievedToken(e.target.value);
	};

	/**
	 * This function attempts to join a shopping list based on the provided Token.
	 */
	const joinExistentList = (e) => {
		e.preventDefault();

		setListToken(retrievedToken);
	};

	return (
		<div className="Home">
			<Button label="Create New List" onClick={createNewList} />
			<p>-or-</p>
			<p>Join an existing shopping list by entering a three word token.</p>

			<form onSubmit={joinExistentList}>
				<label htmlFor="token">Share token</label>
				<br />
				<input
					type="text"
					name="token"
					onChange={handleTokenInput}
					value={retrievedToken}
				/>
				<br />
				<Button label="Join an existing list" type="submit" />
			</form>
		</div>
	);
}
