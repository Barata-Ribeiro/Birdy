import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedinIn, FaFolder } from "react-icons/fa";

import Head from "../../components/helpers/Head";
import Input from "../../components/shared/Input";

const SignIn = () => {
	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		console.log("SUBMIT");
	};

	return (
		<>
			<Head
				title="Login"
				description="Login to your Birdy account to start posting photos."
			/>
			<h1 className="my-6 text-2xl">LOGO HERE!</h1>
			<form
				onSubmit={handleSubmit}
				className="mx-auto w-full px-4 sm:w-2/3 lg:px-0"
			>
				<div className="pb-2 pt-4">
					<Input
						label={"email"}
						type={"email"}
						name={"email"}
						inputClasses="block w-full rounded-lg bg-mantis-200 dark:bg-mantis-800 p-4 text-lg placeholder:text-green-spring-400"
					/>
				</div>
				<div className="pb-2 pt-4">
					<Input
						label={"password"}
						type={"password"}
						name={"password"}
						inputClasses="block w-full rounded-lg bg-mantis-200 dark:bg-mantis-800 p-4 text-lg placeholder:text-green-spring-400"
					/>
				</div>
				<div className="text-right">
					<Link
						to="../password-lost"
						className="text-green-spring-600 transition-colors duration-300 hover:text-bright-turquoise-500 hover:underline dark:text-green-spring-400 dark:hover:text-bright-turquoise-200"
					>
						Forgot your password?
					</Link>
				</div>
				<div className="px-4 pb-2 pt-4">
					<button className="block w-full rounded-full bg-mantis-600 p-4 text-lg uppercase tracking-wide text-green-spring-50 transition-colors duration-300 hover:bg-mantis-400 focus:outline-none focus:ring focus:ring-blue-300/80">
						sign in
					</button>
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

export default SignIn;
