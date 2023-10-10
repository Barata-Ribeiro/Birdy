import { ButtonHTMLAttributes, PropsWithChildren } from "react";

type FormButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	customClasses?: string;
};

const FormButton = ({
	children,
	customClasses = "",
	...props
}: PropsWithChildren<FormButtonProps>) => {
	//p-4 text-lg
	return (
		<button
			className={`${customClasses} block w-full bg-mantis-600 uppercase tracking-wide text-green-spring-50 transition-colors duration-300 hover:bg-mantis-400 focus:outline-none focus:ring focus:ring-blue-300/80`}
			{...props}
		>
			{children}
		</button>
	);
};

export default FormButton;
