const Button = ({ label, ariaLabel, onClick, type }) => {
	return (
		<button type={type} aria-label={ariaLabel} onClick={onClick}>
			{label}
		</button>
	);
};

export default Button;
