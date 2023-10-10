import React from "react";
import { Link, useParams } from "react-router-dom";
import { FaGithub, FaLinkedinIn, FaFolder } from "react-icons/fa";

import Head from "../../components/helpers/Head";
import Input from "../../components/shared/Input";
import FormButton from "../../components/shared/FormButton";

const ResetPassword = () => {
	const { userId, token } = useParams();

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		console.log("SUBMIT");
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
				className="mx-auto w-full px-4 sm:w-2/3 lg:px-0"
			>
				<div className="pb-2 pt-4">
					<Input
						label={"Password"}
						type={"password"}
						name={"password"}
						inputClasses="block w-full rounded-lg bg-mantis-200 dark:bg-mantis-800 p-4 text-lg placeholder:text-green-spring-400"
					/>
				</div>
				<div className="pb-2 pt-4">
					<Input
						label={"Confirm Password"}
						type={"password"}
						name={"confirmPassword"}
						inputClasses="block w-full rounded-lg bg-mantis-200 dark:bg-mantis-800 p-4 text-lg placeholder:text-green-spring-400"
					/>
				</div>
				<div className="text-right">
					<Link
						to="../in"
						className="text-green-spring-600 transition-colors duration-300 hover:text-bright-turquoise-500 hover:underline dark:text-green-spring-400 dark:hover:text-bright-turquoise-200"
					>
						Don't wanna reset? Go to login!
					</Link>
				</div>
				<div className="px-4 pb-2 pt-4">
					<FormButton customClasses="p-4 text-lg rounded-2xl">
						reset password
					</FormButton>
				</div>

				<div className="inset-x-0 mt-16 flex justify-center space-x-4 p-4 text-center lg:hidden">
					<a
						href="https://github.com/Barata-Ribeiro/Birdy"
						className="text-mantis-50"
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
						className="text-mantis-50"
						title="Barata Ribeiro - LinkedIn"
					>
						<FaLinkedinIn size={24} />
					</a>
					<a
						href="https://barataribeiro.com/"
						target="_blank"
						rel="noopener noreferrer"
						className="text-mantis-50"
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
