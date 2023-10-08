const ClearButton = ({ ariaLabel, label, onClick, type, isDisabled }) => {
	return (
		<button
			aria-label={ariaLabel}
			type={type}
			onClick={onClick}
			disabled={isDisabled}
			className="btn btn-circle btn-outline btn-primary btn-lg"
		>
			{label}
		</button>
	);
};

export default ClearButton;
