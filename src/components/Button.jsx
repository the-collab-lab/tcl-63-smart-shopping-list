const Button = ({ ariaLabel, label, onClick, type }) => {
	return (
		<button aria-label={ariaLabel} type={type} onClick={onClick}>
			{label}
		</button>
	);
};

export default Button;
