import { useState } from 'react';
import { addItem } from '../api/firebase';

export function AddItem({ listToken }) {
	// Initialize formData state to store user input
	const [formData, setFormData] = useState({
		itemName: '',
		daysUntilNextPurchase: 7,
	});
	// Initialize submission message to display after user submission
	const [submissionStatus, setSubmissionStatus] = useState('');

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
			setSubmissionStatus('Please enter an item name.');
			return;
		}

		try {
			await addItem(listToken, formData); // add formData to firebase
			setSubmissionStatus(
				`${formData.itemName} was successfully added to the database`,
			);
			setFormData({
				itemName: '',
				daysUntilNextPurchase: 7,
			}); // clear the itemName field after submission
		} catch (error) {
			setSubmissionStatus(
				`fail to save the item ${formData.itemName}, please try again`,
			);
			console.log(error);
		}
	}

	return (
		<>
			<form onSubmit={handleSubmit}>
				<label htmlFor="itemName">
					<p>Item name:</p>
					<input
						type="text"
						name="itemName"
						id="itemName"
						value={formData.itemName}
						onChange={handleChange}
						placeholder="add item here"
					></input>
				</label>
				<fieldset style={{ border: 'none' }}>
					<p>How soon will you buy this again?</p>
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
						/>
						Not Soon
					</label>
				</fieldset>
				<button type="submit">Add Item</button>
			</form>
			{/* Give feedback when the item is added, including for screen reader users */}
			<div aria-live="polite">
				{submissionStatus && <p>{submissionStatus}</p>}
			</div>
		</>
	);
}
