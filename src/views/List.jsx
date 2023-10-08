import { useState, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ListItem } from '../components';
import { sanitizeInput } from '../utils/sanitizeInput';
import ClearButton from '../components/ClearButton';
import { ClipboardDocumentIcon } from '@heroicons/react/24/solid';
import { ToastContainer, toast, Slide } from 'react-toastify';

export function List({ data, listToken, setListToken }) {
	const [inputItem, setInputItem] = useState('');
	const navigate = useNavigate();
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
	const filterData = data.filter((listItem) =>
		stringMatch(inputItem, listItem.name),
	);

	const checkedItemCount = data.filter(
		(listItem) => listItem.checked === true,
	).length;

	const copyToken = () => {
		navigator.clipboard.writeText(`${listToken}`);
		toast.success('Token Copied');
	};

	const deleteStorage = () => {
		localStorage.removeItem(listToken);
		setListToken('');
		navigate('/');
	};
	return (
		<div className="flex flex-col flex-grow gap-4 items-center text-center max-h-screen">
			<div className="pt-10">
				<div>
					<div className="text-right">
						{/* LOGOUT */}
						<button className="btn btn-lg btn-outline" onClick={deleteStorage}>
							logout
						</button>
					</div>
					<div className="text-center">
						Your token is:{' '}
						<span className="font-bold">
							{listToken}
							<button
								onClick={copyToken}
								aria-label="copy to clipboard"
								className="pl-2 rounded-md transition-all duration-400 ease-in-out hover:px-2 hover:ml-1 hover:bg-gray-200"
							>
								<ClipboardDocumentIcon className="h-6 w-6 inline" />
							</button>
						</span>
					</div>
					<p>Please feel free to share it with your friends and family!</p>
					<ToastContainer position="top-center" transition={Slide} />
				</div>
			</div>
			{data.length === 0 ? (
				<>
					<p>Your shopping list is empty.</p>
					{/* a NavLink is semantically a better element than a button because
					it links to another page, and it is compatible with screen readers */}
					<NavLink to="/add-item" className="btn btn-neutral mt-3 w-80">
						Add Item
					</NavLink>
				</>
			) : (
				<form onSubmit={(e) => e.preventDefault()}>
					<label htmlFor="filterItems" className="font-bold">
						Filter items
					</label>
					<div className="flex items-center my-6 w-full justify-center">
						<input
							type="text"
							name="filterItems"
							id="filterItems"
							value={inputItem}
							onChange={handleInput}
							ref={filterInputRef}
							placeholder="Start typing here..."
							className="input input-bordered input-primary input-lg text-2xl w-full max-w-xs mr-2 ml-20"
						/>
						<ClearButton
							ariaLabel={'clear input field'}
							label={'x'}
							type={'reset'}
							onClick={handleClear}
						/>
					</div>
				</form>
			)}
			{data.length > 0 && (
				<>
					{/* COMPLETED ITEM COUNT DISPLAY */}
					<p className="text-left">
						Total:{' '}
						<span className="bg-primary px-1 rounded-sm">{data.length}</span>{' '}
						Completed:{' '}
						<span className="bg-accent px-1 rounded-sm">
							{checkedItemCount}
						</span>{' '}
						Active:{' '}
						<span className="bg-base-300 px-1 rounded-sm">
							{data.length - checkedItemCount}
						</span>
					</p>
				</>
			)}
			<div aria-live="polite" className="my-9 px-5 h-full">
				<ul>
					{filterData.length > 0
						? filterData.map((item) => (
								<ListItem
									key={item.id}
									listToken={listToken}
									item={item}
									itemId={item.id}
								/>
						  ))
						: data.length > 0 && <p aria-live="polite">No item found!</p>}
				</ul>
			</div>
			{data.length > 0 && (
				<>
					{/* URGENCY TAG LEGEND */}
					<div className="card max-md:w-[30rem] bg-base-100 shadow-lg my-3 py-3 px-6">
						<h2 className="font-bold">Legend</h2>
						<ul className="text-left">
							<li>
								{' '}
								<div className="w-4 h-4 rounded-full bg-[#da9fbe] inline-block mr-2"></div>
								soon: 7 days
							</li>
							<li>
								<div className="w-4 h-4 rounded-full bg-[#f7b7a3] inline-block mr-2"></div>
								kind of soon: 14 days
							</li>
							<li>
								<div className="w-4 h-4 rounded-full bg-[#c6d68f] inline-block mr-2"></div>
								not soon: 30 days
							</li>
							<li>
								<div className="w-4 h-4 rounded-full bg-gray-300 inline-block mr-2"></div>
								inactive: 60 days since last purchase
							</li>
							<li>
								<div className="w-4 h-4 rounded-full bg-[#e66e92] inline-block mr-2"></div>
								overdue
							</li>
						</ul>
					</div>
				</>
			)}
		</div>
	);
}
