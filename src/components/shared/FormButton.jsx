import PropTypes from "prop-types";

const FormButton = ({ children, customClasses = "", isLoading, ...props }) => {
	const disabledClasses = "opacity-50 cursor-not-allowed";
	return (
		<button
			className={`${customClasses} block w-full select-none bg-mantis-600 uppercase tracking-wide text-green-spring-50 transition-colors duration-300 ${customClasses} ${
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

FormButton.propTypes = {
	children: PropTypes.node.isRequired,
	customClasses: PropTypes.string,
	isLoading: PropTypes.bool,
	props: PropTypes.object,
};

export default FormButton;
