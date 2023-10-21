import React from "react";
import { FaFolder, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";

import Head from "../../components/helpers/Head";
import FormButton from "../../components/shared/FormButton";
import Input from "../../components/shared/Input";

const SignUp = () => {
	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		console.log("SUBMIT");
	};

	return (
		<>
			<Head
				title="Create Account"
				description="Create an account to start posting photos."
			/>
			<h1 className="my-6 text-2xl">LOGO HERE!</h1>
			<form
				onSubmit={handleSubmit}
				className="mx-auto w-full px-4 sm:w-2/3 lg:px-0"
			>
				<div className="pb-2 pt-4">
					<Input
						label={"Username"}
						type={"text"}
						name={"username"}
						inputClasses="block w-full rounded-lg bg-mantis-200 dark:bg-mantis-800 p-4 text-lg placeholder:text-green-spring-400"
					/>
				</div>
				<div className="pb-2 pt-4">
					<Input
						label={"Email"}
						type={"email"}
						name={"email"}
						inputClasses="block w-full rounded-lg bg-mantis-200 dark:bg-mantis-800 p-4 text-lg placeholder:text-green-spring-400"
					/>
				</div>
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
				<div className="flex items-center justify-end gap-2">
					<input
						className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
						type="checkbox"
						name="terms-of-use"
						id="terms-of-use"
						required
						aria-required
					/>{" "}
					<label
						htmlFor="terms-of-use"
						className="text-left text-mantis-950 dark:text-mantis-50"
					>
						I've read and accepted the{" "}
						<Link to={"/terms-of-use"} className="font-semibold underline">
							Terms of Use
						</Link>
						.
					</label>
				</div>
				<div className="px-4 pb-2 pt-4">
					<FormButton customClasses="p-4 text-lg rounded-2xl">
						create account
					</FormButton>
				</div>
				<div className="mt-2 text-center">
					<Link
						to="../in"
						className="text-green-spring-600 transition-colors duration-300 hover:text-bright-turquoise-500 hover:underline dark:text-green-spring-400 dark:hover:text-bright-turquoise-200"
					>
						Already a member? Login!
					</Link>
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

export default SignUp;
