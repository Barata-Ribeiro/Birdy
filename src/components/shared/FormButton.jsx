import PropTypes from "prop-types";

const FormButton = ({
	children,
	customClasses = "",
	isLoading,
	disablingConditions,
	...props
}) => {
	const disabledClasses = "opacity-50 cursor-not-allowed";
	const isDisabled = isLoading || disablingConditions;
	return (
		<button
			className={`${customClasses} block w-full select-none bg-mantis-600 uppercase tracking-wide text-green-spring-50 transition-colors duration-300 ${customClasses} ${
				isDisabled ? disabledClasses : "hover:bg-mantis-400"
			}  focus:outline-none focus:ring focus:ring-blue-300/80`}
			disabled={isDisabled}
			aria-disabled={isDisabled ? "true" : "false"}
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
	disablingConditions: PropTypes.bool,
};

export default FormButton;
