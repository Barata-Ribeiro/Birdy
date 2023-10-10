interface InputProps {
	label: string;
	type: string;
	name: string;
	inputClasses: string;
	placeholder?: string;
	value?: string;
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
	onBlur?: React.FocusEventHandler<HTMLInputElement>;
	error?: string;
}

const Input = ({
	label,
	type,
	name,
	inputClasses,
	value,
	onChange,
	onBlur,
	error,
}: InputProps) => {
	return (
		<>
			<label className="sr-only capitalize" htmlFor={name}>
				{label}
			</label>
			<input
				className={inputClasses}
				type={type}
				name={name}
				id={name}
				placeholder={label}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
			/>
			{error && <p className="">{error}</p>}
		</>
	);
};

export default Input;
