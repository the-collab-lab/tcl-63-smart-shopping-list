import { useState, useRef } from 'react';
import { ListItem } from '../components';
import { sanitizeInput } from '../utils/sanitizeInput';
import Button from '../components/Button';

export function List({ data, listToken }) {
	// OPTION B - GOES WITH OPTION B IN Firebase.js and OPTION B IN Home.jsx
	// FILTER OUT THE DATA THAT CONTAINS AN OBJECT WITH NO NAME PROPERTY
	const realData = data.filter((item) => item.name);
	const [inputItem, setInputItem] = useState('');

	// Initialize a useRef to bring focus back to input field
	const filterInputRef = useRef(null);

	// This fuction resets the input field:
	const handleClear = () => {
		setInputItem('');
		filterInputRef.current.focus();
	};

	const handleInput = (e) => {
		setInputItem(e.target.value);
	};
	// This helper function matches the user input any part of the item name from the items list
	// It also sanitizes the input by filtering out any special characters and converting uppercase to lowercase
	const stringMatch = (inputItem, listItem) => {
		const sanitizedInput = sanitizeInput(inputItem);
		return listItem.toLowerCase().includes(sanitizedInput.toLowerCase());
	};

	// Applies the helper function to narrow down the data
	const filterData = realData.filter((listItem) =>
		stringMatch(inputItem, listItem.name),
	);

	return (
		<>
			<p>Your token is: {listToken}</p>
			{realData.length === 0 ? (
				<p>Your shopping list is empty. Click on "Add item" to begin!</p>
			) : (
				<form onSubmit={(e) => e.preventDefault()}>
					<label htmlFor="filterItems">Filter items</label>
					<br />
					<input
						type="text"
						name="filterItems"
						id="filterItems"
						value={inputItem}
						onChange={handleInput}
						ref={filterInputRef}
						placeholder="Start typing here..."
					/>
					<Button
						ariaLabel={'clear input field'}
						label={'x'}
						type={'reset'}
						onClick={handleClear}
					/>
				</form>
			)}
			{/* Accessibility feature: added the aria-live attribute for screenreaders */}
			<div aria-live="polite">
				<ul>
					{filterData.length > 0
						? filterData.map((item) => (
								<ListItem
									key={item.id}
									name={item.name}
									listToken={listToken}
									itemId={item.id}
									lastPurchased={item.lastPurchased}
								/>
						  ))
						: realData.length > 0 && <p aria-live="polite">No item found!</p>}
				</ul>
			</div>
		</>
	);
}
