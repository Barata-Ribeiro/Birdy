const Input = ({ label, type, name, inputClasses, error, ...props }) => {
	return (
		<>
			<label className="sr-only capitalize" htmlFor={name}>
				{label}
			</label>
			<input
				className={`${inputClasses} border-green-spring-50 text-mantis-950 focus:border-bright-turquoise-500 peer block w-full rounded-lg ${
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
