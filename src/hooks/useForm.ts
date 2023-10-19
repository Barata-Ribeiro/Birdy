import { ChangeEvent, useState } from "react";

interface ValidationTypes {
	[key: string]: {
		regex: RegExp;
		message: string;
	};
}

const types: ValidationTypes = {
	email: {
		regex:
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
		message: "Use a valid email address.",
	},
	password: {
		regex:
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
		message:
			"The password must have at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.",
	},
	number: {
		regex: /^\d+$/,
		message: "Only numbers are allowed.",
	},
};

const useForm = (type: string | false) => {
	const [value, setValue] = useState<string>("");
	const [error, setError] = useState<string | null>(null);

	const validate = (value: string): boolean => {
		if (type === false) return true;
		if (value.length === 0) {
			setError("There must be a value.");
			return false;
		} else if (types[type] && !types[type].regex.test(value)) {
			setError(types[type].message);
			return false;
		} else {
			setError(null);
			return true;
		}
	};

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (error) validate(event.target.value);
		setValue(event.target.value);
	};

	return {
		value,
		setValue,
		onChange,
		error,
		validate: () => validate(value),
		onBlur: () => validate(value),
	};
};

export default useForm;
