interface InputProps {
	label: string;
	type: string;
	name: string;
	value: string;
	placeholder?: string;
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
	onBlur?: React.FocusEventHandler<HTMLInputElement>;
	error?: string;
}

const Input = ({
	label,
	type,
	name,
	value,
	onChange,
	error,
	onBlur,
}: InputProps) => {
	return (
		<div className="">
			<label className="" htmlFor={name}>
				{label}
			</label>
			<input
				className=""
				type={type}
				name={name}
				id={name}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
			/>
			{error && <p className="">{error}</p>}
		</div>
	);
};

export default Input;
