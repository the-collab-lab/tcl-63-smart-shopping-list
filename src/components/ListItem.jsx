import './ListItem.css';
import { useCallback, useEffect, useState } from 'react';
import { getFutureDate, purchaseSchedule } from '../utils';
import { updateItem, deleteItem } from '../api/firebase';
import Button from './Button';
import DeleteItemModal from './DeleteItemModal';

export function ListItem({ listToken, item, itemId }) {
	const { name, dateLastPurchased, dateNextPurchased, checked } = item;
	const [isPurchased, setIsPurchased] = useState(checked);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const purchaseUrgency = purchaseSchedule(
		dateLastPurchased,
		dateNextPurchased,
	);
	// The dash is necessary for CSS class naming convention, but on UI we still want to display normal text
	const urgencyText = {
		'kind-of-soon': 'kind of soon',
		'not-soon': 'not soon',
	};
	const displayUrgency = urgencyText[purchaseUrgency] || purchaseUrgency;
	/**
	 * If 24 hours has passed or the item is unchecked,
	 * we change the state of the item and send to the database
	 */
	const handleChange = () => {
		if (is24HoursPassed() || !checked) {
			setIsPurchased(!isPurchased);

			try {
				updateItem(listToken, itemId, !isPurchased);
			} catch (error) {
				console.log(error);
			}
		}
	};

	/**
	 * The is24HoursPassed function returns true of dateLastPurchased has passed 24 hours
	 * Wrapping is24HoursPassed inside useCallback because this function is a dependency of useEffect
	 */
	const is24HoursPassed = useCallback(() => {
		if (dateLastPurchased !== null) {
			const dateLastPurchased_formatted = new Date(dateLastPurchased.toDate());
			const yesterday = getFutureDate(-1);
			return dateLastPurchased_formatted < yesterday;
		}
		return true;
	}, [dateLastPurchased]);

	// uncheck the item checked field and update the database value after 24 hours
	useEffect(() => {
		if (is24HoursPassed() && checked) {
			setIsPurchased(false);
			updateItem(listToken, itemId, false);
		}
	}, [is24HoursPassed, itemId, listToken, checked]);

	const handleDelete = async () => {
		await deleteItem(listToken, itemId);
	};

	const toggleDeleteModal = () => {
		setIsModalOpen(!isModalOpen);
	};

	return (
		<>
			<li className="ListItem">
				<label aria-label={`Mark ${name} as purchased`}>
					<input
						id={name}
						name={name}
						type="checkbox"
						checked={isPurchased}
						onChange={handleChange}
					/>
					{name}
					<span className={`urgency-tag ${purchaseUrgency}`}>
						{displayUrgency}
					</span>
				</label>
				&nbsp;
				<Button
					label="Delete"
					ariaLabel={`Delete ${name} from your list`}
					type="button"
					onClick={toggleDeleteModal}
				/>
				<DeleteItemModal
					isModalOpen={isModalOpen}
					closeModal={toggleDeleteModal}
					confirmDelete={handleDelete}
					itemName={name}
				/>
			</li>
		</>
	);
}
