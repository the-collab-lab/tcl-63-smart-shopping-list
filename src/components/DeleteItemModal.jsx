import Button from './Button';
import ReactModal from 'react-modal';
ReactModal.setAppElement('#root');

const DeleteItemModal = ({
	modalStatus,
	closeModal,
	confirmDelete,
	itemName,
}) => {
	return (
		<ReactModal
			className="delete-modal"
			isOpen={modalStatus}
			onRequestClose={closeModal}
		>
			<h2>{`Are you sure you want to delete ${itemName} from your list?`}</h2>
			<p>Press CONFIRM if yes, press CANCEL to return to your shopping list.</p>
			<Button
				label="Confirm"
				ariaLabel={`Confirm deleting ${itemName} from your list`}
				type="button"
				onClick={confirmDelete}
			/>
			&nbsp;
			<Button
				label="Cancel"
				ariaLabel={`Cancel deleting ${itemName} from your list`}
				type="button"
				onClick={closeModal}
			/>
		</ReactModal>
	);
};

export default DeleteItemModal;
