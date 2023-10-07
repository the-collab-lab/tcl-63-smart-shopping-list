import { useState } from 'react';
import { addItem } from '../api/firebase';
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify to display alert messages

export function AddItem({ listToken, data }) {
	// This regex will match most punctuation and control characters but will allow letters and numbers in any script.
	const unwantedCharsRegex = /[^\p{L}\p{N}\s]/gu;

	const normalizeItemName = (name) => {
		return name
			.normalize('NFD')
			.toLowerCase()
			.replace(unwantedCharsRegex, '')
			.trim();
	};

	// get the list of item names from existing list from firebase, filter is necessary to remove the empty item when the list is first created
	const existingItems = data
		.filter((item) => item.name !== undefined)
		.map((item) => normalizeItemName(item.name));

	// Initialize formData state to store user input
	const [formData, setFormData] = useState({
		itemName: '',
		daysUntilNextPurchase: 7,
	});

	// This handleChange function updates the formData object as we receive user inputs
	// It converts radio button value from string to integer type for calculation of "nextPurchasedDate"
	function handleChange(event) {
		// destructure the event target
		const { name, value, type } = event.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: type === 'radio' ? parseInt(value) : value,
		}));
	}
	// This async handleSubmit function sends the data to firebase and displays a user message
	async function handleSubmit(event) {
		event.preventDefault();
		// check if user has entered an empty string or whitespace
		if (formData.itemName.trim() === '') {
			toast.error('An item name cannot be empty. Please enter an item name.');
			return;
		}

		// check if the item user entered is already on the list
		else if (existingItems.includes(normalizeItemName(formData.itemName))) {
			toast.error('The item is already in the list');
			return;
		}
		try {
			await addItem(listToken, formData); // add formData to firebase
			toast.success(
				`${formData.itemName} was successfully added to the database`,
			);
			setFormData({
				itemName: '',
				daysUntilNextPurchase: 7,
			}); // clear the itemName field after submission
		} catch (error) {
			toast.error(
				`fail to save the item ${formData.itemName}, please try again`,
			);
			console.log(error);
		}
	}

	return (
		<>
			<form onSubmit={handleSubmit}>
				<label htmlFor="itemName">
					<p className="font-bold">Item name:</p>
					<input
						type="text"
						name="itemName"
						id="itemName"
						value={formData.itemName}
						onChange={handleChange}
						placeholder="add item here"
						className="input input-bordered my-3"
					/>
				</label>
				<fieldset style={{ border: 'none' }}>
					<p className="text-3xl font-bold">
						How soon will you buy this again?
					</p>
					<label htmlFor="soon">
						{/* this <br> is necessary for the screen reader to read first radio button */}
						<br />
						<input
							type="radio"
							name="daysUntilNextPurchase"
							id="soon"
							value="7"
							onChange={handleChange}
							checked={formData.daysUntilNextPurchase === 7}
							className="radio radio-info mr-2"
							required // ensures the user makes a selection before proceeding
						/>
						Soon
					</label>
					<br />
					<label htmlFor="kindsoon">
						<input
							type="radio"
							name="daysUntilNextPurchase"
							id="kindsoon"
							value="14"
							checked={formData.daysUntilNextPurchase === 14}
							onChange={handleChange}
							className="radio radio-info mr-2"
						/>
						Kind of Soon
					</label>
					<br />
					<label htmlFor="notsoon">
						<input
							type="radio"
							name="daysUntilNextPurchase"
							id="notsoon"
							value="30"
							checked={formData.daysUntilNextPurchase === 30}
							onChange={handleChange}
							className="radio radio-info mr-2"
						/>
						Not Soon
					</label>
				</fieldset>
				<button type="submit" className="btn btn-neutral mt-3">
					Add Item
				</button>
			</form>
			{/* Prompt users with alert message, including for screen reader users */}
			<ToastContainer position="top-center" />
		</>
	);
}
