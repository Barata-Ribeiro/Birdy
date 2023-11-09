import { Link } from "react-router-dom";

const MainButton = ({ children, customClasses, ...props }) => {
	return (
		<Link
			className={`bg-mantis-600 rounded-md ${customClasses} text-green-spring-50 hover:bg-mantis-400 select-none text-sm capitalize tracking-wide transition-colors duration-300 focus:outline-none focus:ring focus:ring-blue-300/80 sm:order-2 sm:w-auto`}
			{...props}
		>
			{children}
		</Link>
	);
};

export default MainButton;
