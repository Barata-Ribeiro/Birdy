import { ComponentProps } from "react";

type InputProps = ComponentProps<"input"> & {
	label: string;
	type: string;
	name: string;
	inputClasses: string;
	error?: string | null;
};

const Input = ({
	label,
	type,
	name,
	inputClasses,
	error,
	...props
}: InputProps) => {
	return (
		<>
			<label className="sr-only capitalize" htmlFor={name}>
				{label}
			</label>
			<input
				className={`${inputClasses} peer block w-full rounded-lg border-green-spring-50 text-mantis-950 focus:border-bright-turquoise-500 ${
					error ? "border-2 border-red-500" : ""
				}`}
				type={type}
				name={name}
				id={name}
				placeholder={label}
				{...props}
			/>
			{error && (
				<p
					className="mt-2 text-sm text-red-500"
					role="alert"
					id={`error-${name}`}
				>
					{error}
				</p>
			)}
		</>
	);
};

export default Input;
