import { useEffect, useState } from "react";
import { FaFolder, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";

import Error from "../../components/helpers/Error";
import Head from "../../components/helpers/Head";
import FormButton from "../../components/shared/FormButton";
import Input from "../../components/shared/Input";
import { AUTH_RESET_PASSWORD } from "../../constants";
import useFetch from "../../hooks/useFetch";
import useForm from "../../hooks/useForm";

const ResetPassword = () => {
	const { userId, token } = useParams();
	const { loading, error, request } = useFetch();
	const password = useForm("password");
	const confirmPassword = useForm();
	const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		if (password.value !== undefined) {
			if (password.value !== confirmPassword.value)
				setErrorConfirmPassword("Passwords do not match!");
			else setErrorConfirmPassword(undefined);
		}
	}, [password, confirmPassword]);

	const handleSubmit = async (event) => {
		event.preventDefault();

		const isPasswordValid = password.validate();
		const isConfirmPasswordValid = password.value === confirmPassword.value;

		if (isPasswordValid && isConfirmPasswordValid) {
			try {
				const { url, options } = AUTH_RESET_PASSWORD(userId, token, {
					password: password.value,
				});
				const { response, json } = await request(url, options);
				if (response.ok) {
					alert(json.message);
					navigate("/sign/in");
				}
			} catch (error) {
				console.log(error);
			}
		}
	};

	return (
		<>
			<Head
				title="Reset Password!"
				description="With the link sent to your email address, you can reset your password here by typing your new password."
			/>
			<h1 className="my-6 text-2xl">LOGO HERE!</h1>
			<form
				onSubmit={handleSubmit}
				className="group mx-auto w-full px-4 sm:w-2/3 lg:px-0"
			>
				<div className="pb-2 pt-4">
					<Input
						label="Password"
						type="password"
						name="password"
						inputClasses="bg-mantis-200 dark:bg-mantis-800 p-4 text-lg placeholder:text-green-spring-400 dark:placeholder:text-green-spring-300"
						value={password.value}
						onChange={password.onChange}
						onBlur={password.onBlur}
						error={password.error}
						aria-invalid={password.error ? "true" : "false"}
						aria-describedby={
							password.error ? `error-${password.value}` : undefined
						}
						required
					/>
				</div>
				<div className="pb-2 pt-4">
					<Input
						label={"Confirm Password"}
						type={"password"}
						name={"confirmPassword"}
						inputClasses="bg-mantis-200 dark:bg-mantis-800 p-4 text-lg placeholder:text-green-spring-400 dark:placeholder:text-green-spring-300"
						value={confirmPassword.value}
						onChange={confirmPassword.onChange}
						onBlur={confirmPassword.onBlur}
						error={errorConfirmPassword || confirmPassword.error}
						aria-invalid={
							errorConfirmPassword || confirmPassword.error ? "true" : "false"
						}
						aria-describedby={
							errorConfirmPassword || confirmPassword.error
								? `error-${errorConfirmPassword || confirmPassword.error}`
								: undefined
						}
						required
					/>
				</div>
				<div className="text-right">
					<Link
						to="../in"
						className="text-green-spring-50 transition-colors duration-300 hover:text-bright-turquoise-500 hover:underline dark:text-green-spring-400 dark:hover:text-bright-turquoise-200 lg:text-green-spring-600"
					>
						Don&apos;t wanna reset? Go to login!
					</Link>
				</div>
				<div className="px-4 pb-2 pt-4">
					<FormButton
						customClasses="p-4 text-lg rounded-2xl group-invalid:pointer-events-none group-invalid:opacity-30"
						isLoading={loading}
					>
						reset password
					</FormButton>
				</div>
				<Error error={error} />
				<div className="inset-x-0 mt-16 flex justify-center space-x-4 p-4 text-center lg:hidden">
					<a
						href="https://github.com/Barata-Ribeiro/Birdy"
						className="text-green-spring-50"
						target="_blank"
						rel="noopener noreferrer"
						title="Birdy - Repository"
					>
						<FaGithub size={24} />
					</a>
					<a
						href="https://www.linkedin.com/in/jo%C3%A3o-mendes-jorge-barata-ribeiro-645073118/"
						target="_blank"
						rel="noopener noreferrer"
						className="text-green-spring-50"
						title="Barata Ribeiro - LinkedIn"
					>
						<FaLinkedinIn size={24} />
					</a>
					<a
						href="https://barataribeiro.com/"
						target="_blank"
						rel="noopener noreferrer"
						className="text-green-spring-50"
						title="Barata Ribeiro - Portfolio"
					>
						<FaFolder size={24} />
					</a>
				</div>
			</form>
		</>
	);
};

export default ResetPassword;
