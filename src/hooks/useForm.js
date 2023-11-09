import { useState } from "react";

const types = {
	username: {
		regex:
			/^[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ]([a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ ]{3,23})[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ]$/,
		message:
			"Username must start with a letter, be 5-25 characters long, may include spaces and accented letters, but no numbers or special symbols.",
	},
	email: {
		regex:
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
		message: "Use a valid email address.",
	},
	password: {
		regex: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
		message:
			"The password must have at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.",
	},
	number: {
		regex: /^\d+$/,
		message: "Only numbers are allowed.",
	},
};

const useForm = (type) => {
	const [value, setValue] = useState("");
	const [error, setError] = useState(null);

	const validate = (value) => {
		if (value.length <= 0) {
			setError("This field can not be empty.");
			return false;
		} else if (type !== null && types[type] && !types[type].regex.test(value)) {
			setError(types[type].message);
			return false;
		} else {
			setError(null);
			return true;
		}
	};

	const onChange = (event) => {
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
