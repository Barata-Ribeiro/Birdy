import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const MainButton = ({ children, customClasses, ...props }) => {
	return (
		<Link
			className={`rounded-md bg-mantis-600 ${customClasses} select-none text-sm capitalize tracking-wide text-green-spring-50 transition-colors duration-300 hover:bg-mantis-400 focus:outline-none focus:ring focus:ring-blue-300/80 sm:order-2 sm:w-auto`}
			{...props}
		>
			{children}
		</Link>
	);
};

MainButton.propTypes = {
	children: PropTypes.node.isRequired,
	customClasses: PropTypes.string,
	props: PropTypes.object,
};

export default MainButton;
