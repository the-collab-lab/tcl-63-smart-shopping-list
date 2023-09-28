import { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { ListItem } from '../components';
import { sanitizeInput } from '../utils/sanitizeInput';
import ClearButton from '../components/ClearButton';
import './List.css';
import { ClipboardDocumentIcon } from '@heroicons/react/24/solid';
import { ToastContainer, toast } from 'react-toastify';

export function List({ data, listToken }) {
	// OPTION B - GOES WITH OPTION B IN Firebase.js and OPTION B IN Home.jsx
	// FILTER OUT THE DATA THAT CONTAINS AN OBJECT WITH NO NAME PROPERTY
	const realData = data.filter((item) => item.name);
	const [inputItem, setInputItem] = useState('');
	const [showDetails, setShowDetails] = useState(false);

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

	const toggleDetails = () => {
		setShowDetails(!showDetails);
	};

	const copyToken = () => {
		navigator.clipboard.writeText(`${listToken}`);
		toast.success('Token Copied');
	};

	return (
		<div className="flex flex-col flex-grow max-h-screen">
			<div className="mb-4">
				<p>Friends who shop together, stay together!</p>
				<div>
					<ToastContainer position="top-center" />
					<p>
						Your token is:{' '}
						<span className="font-bold">
							{listToken}
							<button onClick={copyToken}>
								<ClipboardDocumentIcon className="ml-1 h-6 w-6 inline" />
							</button>
						</span>
					</p>
					<p>Please feel free to share it with your friends and family</p>
				</div>
				<button
					className="font-bold hover:text-red-600"
					onClick={toggleDetails}
				>
					{showDetails ? 'Hide item details' : 'Show item details'}
				</button>
			</div>
			{realData.length === 0 ? (
				<>
					<p>Your shopping list is empty.</p>
					{/* a NavLink is semantically a better element than a button because
					it links to another page, and it is compatible with screen readers */}
					<NavLink to="/add-item" className="addItemButton">
						Add Item
					</NavLink>
				</>
			) : (
				<form onSubmit={(e) => e.preventDefault()}>
					<label htmlFor="filterItems" className="font-bold">
						Filter items
					</label>
					<br />
					<input
						type="text"
						name="filterItems"
						id="filterItems"
						value={inputItem}
						onChange={handleInput}
						ref={filterInputRef}
						placeholder="Start typing here..."
						className="input input-bordered input-primary w-full max-w-xs my-3 mr-2"
					/>
					<ClearButton
						ariaLabel={'clear input field'}
						label={'x'}
						type={'reset'}
						onClick={handleClear}
					/>
				</form>
			)}
			{/* Accessibility feature: added the aria-live attribute for screenreaders */}
			<div
				aria-live="polite"
				className="my-10 px-5 h-full overflow-y-scroll pb-[30rem]"
			>
				<ul>
					{filterData.length > 0
						? filterData.map((item) => (
								<ListItem
									key={item.id}
									listToken={listToken}
									item={item}
									itemId={item.id}
									showDetails={showDetails}
								/>
						  ))
						: realData.length > 0 && <p aria-live="polite">No item found!</p>}
				</ul>
			</div>
		</div>
	);
}
