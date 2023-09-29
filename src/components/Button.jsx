const Button = ({ ariaLabel, label, onClick, type, isDisabled }) => {
	return (
		<button
			aria-label={ariaLabel}
			type={type}
			onClick={onClick}
			disabled={isDisabled}
			className="btn btn-neutral mt-3 w-80"
		>
			{label}
		</button>
	);
};

export default Button;
