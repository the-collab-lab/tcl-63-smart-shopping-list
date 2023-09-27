import { TrashIcon } from '@heroicons/react/24/solid';

const DeleteButton = ({ ariaLabel, onClick, type, isDisabled }) => {
	return (
		<button
			aria-label={ariaLabel}
			type={type}
			onClick={onClick}
			disabled={isDisabled}
		>
			<TrashIcon className="h-6 w-6 text-red-500 hover:text-red-600" />
		</button>
	);
};

export default DeleteButton;
