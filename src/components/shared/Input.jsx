import PropTypes from "prop-types";

const Input = ({ label, type, name, inputClasses, error, ...props }) => {
	return (
		<>
			<label className="sr-only capitalize" htmlFor={name}>
				{label}
			</label>
			<input
				className={`${inputClasses} peer block w-full rounded-lg border-green-spring-50 text-mantis-950 focus:border-bright-turquoise-500 dark:text-mantis-50 ${
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

Input.propTypes = {
	label: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	inputClasses: PropTypes.string,
	error: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
	props: PropTypes.object,
};

export default Input;
