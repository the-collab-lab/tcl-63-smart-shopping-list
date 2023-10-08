const Button = ({ ariaLabel, label, onClick, type, isDisabled }) => {
	return (
		<button
			aria-label={ariaLabel}
			type={type}
			onClick={onClick}
			disabled={isDisabled}
			className="btn bg-[#2b3440] hover:btn-neutral hover:text-white btn-lg text-white text-2xl mt-3"
		>
			{label}
		</button>
	);
};

export default Button;
