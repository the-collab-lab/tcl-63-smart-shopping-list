import './ListItem.css';
import { useEffect, useState } from 'react';
import { updateItem } from '../api/firebase';
import { getFutureDate } from '../utils';

export function ListItem({ name, listToken, itemId, lastPurchased }) {
	const [isPurchased, setIsPurchased] = useState(false);
	const [isDisabled, setIsDisabled] = useState(false);

	const yesterday = getFutureDate(-1);

	const handleChange = () => {
		setIsPurchased((oldisPurchased) => !oldisPurchased);

		try {
			updateItem(listToken, itemId, !isPurchased);
		} catch (error) {
			console.log(error);
		}
	};

	const datePassed = () => {
		const yesterday = getFutureDate(-1);
		if (lastPurchased < yesterday) {
			setIsDisabled(!isDisabled);
		}
	};

	useEffect(() => {
		datePassed();
	}, [isPurchased]); // lastPurchased

	return (
		<>
			<li className="ListItem">
				<label aria-label="Mark as purchased">
					<input
						id={name}
						name={name}
						type="checkbox"
						checked={isPurchased}
						onChange={handleChange}
						disabled={isDisabled}
					/>
					{name}
				</label>
			</li>
		</>
	);
}
