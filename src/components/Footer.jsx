import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

import MainButton from "./shared/MainButton";

const footerLinkes = {
	privacy: "/privacy-policy",
	terms: "/terms-of-use",
	portfolio: "https://barataribeiro.com/",
};

const Footer = () => {
	return (
		<footer className="bg-green-spring-50 dark:bg-green-spring-950">
			<div className="container mx-auto px-6 py-8">
				<div className="flex flex-col items-center text-center">
					<Link to="/">
						<img
							className="h-20 w-auto"
							src="https://www.kadencewp.com/wp-content/uploads/2020/10/alogo-1.svg"
							alt="Logo"
						/>
					</Link>

					<p className="text-green-spring-500 dark:text-green-spring-400 mx-auto mt-4 max-w-md">
						Birdy is an open-source project made by{" "}
						<Link
							className="text-green-spring-600 hover:text-bright-turquoise-500 dark:text-green-spring-400 dark:hover:text-bright-turquoise-200 transition-colors duration-300"
							to={"https://barataribeiro.com/"}
							rel="noopener noreferrer"
						>
							Barata Ribeiro
						</Link>
						. Feel free to use, study, or contribute as you wish.
					</p>

					<div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-center">
						<Link
							to="https://github.com/Barata-Ribeiro/Birdy"
							rel="noopener noreferrer"
							className="text-green-spring-600 hover:bg-green-spring-100 focus:ring-green-spring-300/40 dark:border-green-spring-400 dark:text-green-spring-300 dark:hover:bg-green-spring-800 order-1 mt-3 flex w-full items-center justify-center rounded-md border p-2 text-sm capitalize tracking-wide transition-colors duration-300 focus:outline-none focus:ring sm:mt-0 sm:w-auto"
						>
							<FaGithub size="18" />

							<span className="mx-1">Repository</span>
						</Link>
						<MainButton to={"/sign/up"} customClasses={"px-5 py-2"}>
							Sign Up
						</MainButton>
					</div>
				</div>

				<hr className="border-green-spring-200 dark:border-green-spring-700 my-10" />

				<div className="flex flex-col items-center sm:flex-row sm:justify-between">
					<p className="text-green-spring-500 text-sm">
						© Copyright <span>{new Date().getFullYear()}</span>. All Rights
						Reserved.
					</p>

					<div className="-mx-2 mt-3 flex sm:mt-0">
						{Object.entries(footerLinkes).map(([key, value]) => (
							<Link
								key={key}
								to={value}
								className="text-green-spring-600 hover:text-bright-turquoise-500 dark:text-green-spring-400 dark:hover:text-bright-turquoise-200 mx-2 text-sm transition-colors duration-300"
							>
								{key}
							</Link>
						))}
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
