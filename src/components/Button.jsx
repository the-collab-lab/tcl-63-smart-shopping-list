const Button = ({ ariaLabel, label, onClick, type, isDisabled }) => {
	return (
		<button aria-label={ariaLabel} type={type} onClick={onClick} disabled={isDisabled}>
			{label}
		</button>
	);
};

export default Button;
