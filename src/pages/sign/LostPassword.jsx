import { FaFolder, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";

import Head from "../../components/helpers/Head";
import FormButton from "../../components/shared/FormButton";
import Input from "../../components/shared/Input";
import useForm from "../../hooks/useForm";

const LostPassword = () => {
	const email = useForm();

	const handleSubmit = async (event) => {
		event.preventDefault();
		console.log("SUBMIT");
	};
	return (
		<>
			<Head
				title="Lost Password?"
				description="If you forgot your password, you can reset it by typing your email address, and a link for reset will be sent."
			/>
			<h1 className="my-6 text-2xl">LOGO HERE!</h1>
			<form
				onSubmit={handleSubmit}
				className="group mx-auto w-full px-4 sm:w-2/3 lg:px-0"
			>
				<div className="pb-2 pt-4">
					<Input
						label="Email"
						type="email"
						name="email"
						inputClasses="bg-mantis-200 dark:bg-mantis-800 p-4 text-lg placeholder:text-green-spring-400"
						value={email.value}
						onChange={email.onChange}
						onBlur={email.onBlur}
						error={email.error}
						aria-invalid={email.error ? "true" : "false"}
						aria-describedby={email.error ? `error-${email.value}` : undefined}
						required
					/>
				</div>
				<div className="text-right">
					<Link
						to="../in"
						className="text-green-spring-50 hover:text-bright-turquoise-500 dark:text-green-spring-400 dark:hover:text-bright-turquoise-200 lg:text-green-spring-600 transition-colors duration-300 hover:underline"
					>
						Misclicked? Go back to login!
					</Link>
				</div>
				<div className="px-4 pb-2 pt-4">
					<FormButton customClasses="p-4 text-lg rounded-2xl group-invalid:pointer-events-none group-invalid:opacity-30">
						send reset link
					</FormButton>
				</div>
				<div className="mt-2 text-center">
					<Link
						to="../up"
						className="text-green-spring-50 hover:text-bright-turquoise-500 dark:text-green-spring-400 dark:hover:text-bright-turquoise-200 lg:text-green-spring-600 transition-colors duration-300 hover:underline"
					>
						Don't have an account? Sign Up!
					</Link>
				</div>

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

export default LostPassword;