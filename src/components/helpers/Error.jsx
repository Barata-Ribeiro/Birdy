import PropTypes from "prop-types";

const Error = ({ error }) => {
	if (!error) return null;
	return (
		<p
			className="text-lg font-semibold text-red-500"
			role="alert"
			aria-invalid={error ? "true" : "false"}
			aria-describedby={error ? `error-${error}` : undefined}
		>
			{error}
		</p>
	);
};

Error.propTypes = {
	error: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
};

export default Error;
