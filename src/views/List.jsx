import { useState } from 'react';
import { ListItem } from '../components';
import Button from '../components/Button';

export function List({ data, listToken }) {
	const [inputItem, setInputItem] = useState('');
	// This fuction resets the input field:
	const handleClear = () => {
		setInputItem('');
	};
	const handleInput = (e) => {
		setInputItem(e.target.value);
	};
	// This helper function matches the user input any part of the item name from the items list
	const stringMatch = (inputItem, listItem) => {
		return listItem.toLowerCase().includes(inputItem.toLowerCase());
	};
	// Applies the helper function to narrow down the data
	const filterData = data.filter((listItem) =>
		stringMatch(inputItem, listItem.name),
	);
	return (
		<>
			<p>
				Hello from the <code>/list</code> page!
			</p>
			<p>Your token is: {listToken}</p>
			{data.length === 0 && (
				<p>Your shopping list is empty. Click on "Add item" to begin!</p>
			)}
			<form onSubmit={(e) => e.preventDefault()}>
				<label htmlFor="filter">Filter items</label>
				<br />
				<input
					type="text"
					name="filter"
					id="filter"
					value={inputItem}
					onChange={handleInput}
					placeholder="Start typing here..."
				/>
				<Button label={'x'} type={'reset'} onClick={handleClear} />
			</form>
			<ul>
				{filterData.length > 0 ? (
					filterData.map((item) => <ListItem key={item.id} name={item.name} />)
				) : (
					<p>No item found!</p>
				)}
			</ul>
		</>
	);
}
