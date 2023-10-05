import { Link } from "react-router-dom";

interface MainButtonProps {
	NavToLink: string;
	padding: string;
}

const MainButton = ({
	children,
	NavToLink,
	padding,
}: React.PropsWithChildren<MainButtonProps>) => {
	return (
		<Link
			to={NavToLink}
			className={`w-full rounded-md bg-mantis-600 ${padding} text-sm capitalize tracking-wide text-green-spring-50 transition-colors duration-300 hover:bg-mantis-400 focus:outline-none focus:ring focus:ring-blue-300/80 sm:order-2 sm:w-auto`}
		>
			{children}
		</Link>
	);
};

export default MainButton;
