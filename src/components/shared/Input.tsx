import { FC, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
	type: string;
	name: string;
	inputClasses: string;
	placeholder?: string;
	value?: string;
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
	onBlur?: React.FocusEventHandler<HTMLInputElement>;
	ariaInvalid?: boolean;
	ariaDescribedby?: string;
	error?: string;
}

const Input: FC<InputProps> = ({
	label,
	type,
	name,
	inputClasses,
	value,
	onChange,
	onBlur,
	error,
	ariaInvalid,
	ariaDescribedby,
	...props
}) => {
	return (
		<>
			<label className="sr-only capitalize" htmlFor={name}>
				{label}
			</label>
			<input
				className={`${inputClasses} block w-full rounded-lg border-green-spring-50 text-mantis-950 focus:border-bright-turquoise-500 invalid:[&:not(:placeholder-shown):not(:focus)]:border-2 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500`}
				type={type}
				name={name}
				id={name}
				placeholder={label}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
				aria-invalid={ariaInvalid ? "true" : "false"}
				aria-describedby={ariaDescribedby}
				{...props}
			/>
			{error && (
				<p
					className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block"
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
