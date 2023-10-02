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
			className="delete-modal flex flex-col items-center justify-center"
			isOpen={isModalOpen}
			// React-modal built-in attribute: modal can be closed with ESC key or by clicking outside the modal
			onRequestClose={closeModal}
			style={{
				overlay: {
					zIndex: 1000,
					position: 'fixed',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					backgroundColor: 'rgba(189, 189, 189, 0.5)',
				},
				content: {
					position: 'absolute',
					overflow: 'auto',
					borderRadius: '10px',
					padding: '30px',
				},
			}}
		>
			<h2 className="text-4xl font-bold leading-[3rem]">{`Are you sure you want to delete ${itemName} from your list?`}</h2>
			<div className="mt-5">
				<Button
					label="Confirm"
					ariaLabel={`Confirm deleting ${itemName} from your list`}
					type="button"
					onClick={confirmDelete}
				/>
				&nbsp; &nbsp;
				<Button
					label="Cancel"
					ariaLabel={`Cancel deleting ${itemName} from your list`}
					type="button"
					onClick={closeModal}
				/>
			</div>
		</ReactModal>
	);
};

export default DeleteItemModal;
