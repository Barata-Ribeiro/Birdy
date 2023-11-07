type ErrorProperty = { error: string | null };

const Error = ({ error }: ErrorProperty) => {
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

export default Error;
