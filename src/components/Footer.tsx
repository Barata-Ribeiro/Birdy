import React from "react";

const Footer = () => {
	return (
		<footer className="bg-green-spring-50 dark:bg-green-spring-950">
			<div className="container mx-auto px-6 py-8">
				<div className="flex flex-col items-center text-center">
					<a href="#">
						<img
							className="h-20 w-auto"
							src="https://www.kadencewp.com/wp-content/uploads/2020/10/alogo-1.svg"
							alt=""
						/>
					</a>

					<p className="mx-auto mt-4 max-w-md text-green-spring-500 dark:text-green-spring-400">
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
					</p>

					<div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-center">
						<button className="order-1 mt-3 flex w-full items-center justify-center rounded-md border p-2 text-sm capitalize tracking-wide text-green-spring-600 transition-colors duration-300 hover:bg-green-spring-50 focus:outline-none focus:ring focus:ring-green-spring-300/40 dark:border-green-spring-400 dark:text-green-spring-300 dark:hover:bg-green-spring-800 sm:mx-2 sm:mt-0 sm:w-auto">
							<svg
								className="mx-1 h-5 w-5"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C21.9939 17.5203 17.5203 21.9939 12 22ZM4 12.172C4.04732 16.5732 7.64111 20.1095 12.0425 20.086C16.444 20.0622 19.9995 16.4875 19.9995 12.086C19.9995 7.68451 16.444 4.10977 12.0425 4.086C7.64111 4.06246 4.04732 7.59876 4 12V12.172ZM10 16.5V7.5L16 12L10 16.5Z"
									fill="currentColor"
								></path>
							</svg>

							<span className="mx-1">View Demo</span>
						</button>

						<button className="w-full rounded-md bg-mantis-600 px-5 py-2 text-sm capitalize tracking-wide text-green-spring-50 transition-colors duration-300 hover:bg-mantis-400 focus:outline-none focus:ring focus:ring-blue-300/80 sm:order-2 sm:mx-2 sm:w-auto">
							Get started
						</button>
					</div>
				</div>

				<hr className="my-10 border-green-spring-200 dark:border-green-spring-700" />

				<div className="flex flex-col items-center sm:flex-row sm:justify-between">
					<p className="text-sm text-green-spring-500">
						© Copyright <span>{new Date().getFullYear()}</span>. All Rights
						Reserved.
					</p>

					<div className="-mx-2 mt-3 flex sm:mt-0">
						<a
							href="#"
							className="mx-2 text-sm text-green-spring-500 transition-colors duration-300 hover:text-green-spring-500 dark:hover:text-green-spring-300"
							aria-label="Reddit"
						>
							{" "}
							Teams{" "}
						</a>

						<a
							href="#"
							className="mx-2 text-sm text-green-spring-500 transition-colors duration-300 hover:text-green-spring-500 dark:hover:text-green-spring-300"
							aria-label="Reddit"
						>
							{" "}
							Privacy{" "}
						</a>

						<a
							href="#"
							className="mx-2 text-sm text-green-spring-500 transition-colors duration-300 hover:text-green-spring-500 dark:hover:text-green-spring-300"
							aria-label="Reddit"
						>
							{" "}
							Cookies{" "}
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
