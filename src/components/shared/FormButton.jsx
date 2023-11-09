const FormButton = ({ children, customClasses = "", isLoading, ...props }) => {
	const disabledClasses = "opacity-50 cursor-not-allowed";
	return (
		<button
			className={`${customClasses} bg-mantis-600 text-green-spring-50 block w-full select-none uppercase tracking-wide transition-colors duration-300 ${customClasses} ${
				isLoading ? disabledClasses : "hover:bg-mantis-400"
			}  focus:outline-none focus:ring focus:ring-blue-300/80`}
			disabled={isLoading}
			aria-disabled={isLoading ? "true" : "false"}
			{...props}
		>
			{isLoading ? "Loading..." : children}
		</button>
	);
};

export default FormButton;
