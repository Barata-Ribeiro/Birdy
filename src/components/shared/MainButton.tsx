import { Link, LinkProps } from "react-router-dom";

type MainButtonProps = LinkProps & {
	customClasses: string;
};

const MainButton = ({
	children,
	customClasses: customClasses,
	...props
}: React.PropsWithChildren<MainButtonProps>) => {
	return (
		<Link
			className={`rounded-md bg-mantis-600 ${customClasses} text-sm capitalize tracking-wide text-green-spring-50 transition-colors duration-300 hover:bg-mantis-400 focus:outline-none focus:ring focus:ring-blue-300/80 sm:order-2 sm:w-auto`}
			{...props}
		>
			{children}
		</Link>
	);
};

export default MainButton;
