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
			<label className="sr-only" htmlFor={name}>
				{label.charAt(0).toUpperCase() + name.slice(1)}
			</label>
			<input
				className={inputClasses}
				type={type}
				name={name}
				id={name}
				placeholder={name.charAt(0).toUpperCase() + name.slice(1)}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
			/>
			{error && <p className="">{error}</p>}
		</>
	);
};

export default Input;
