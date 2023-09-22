import Button from './Button';
import ReactModal from 'react-modal';
// for accessibility enhancement: while modal is open, the List page is inactive and focus stays within modal
ReactModal.setAppElement('#root');

const DeleteItemModal = ({
	isModalOpen,
	closeModal,
	confirmDelete,
	itemName,
}) => {
	return (
		<ReactModal
			className="delete-modal"
			isOpen={isModalOpen}
			// React-modal built-in attribute: modal can be closed with ESC key or by clicking outside the modal
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
