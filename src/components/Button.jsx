const Button = ({ label, onClick, type }) => {
	return (
		<button type={type} onClick={onClick}>
			{label}
		</button>
	);
};

export default Button;
