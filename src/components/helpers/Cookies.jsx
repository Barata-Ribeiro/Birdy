import { useState } from "react";
import { Link } from "react-router-dom";

const Cookies = () => {
	const [isCookiesWindowClosed, setIsCookiesWindowClosed] = useState(
		window.localStorage.getItem("cookiesWindowClosed") === "true"
	);

	const handleClick = (event) => {
		event.preventDefault();
		window.localStorage.setItem("cookiesWindowClosed", "true");
		setIsCookiesWindowClosed(true);
	};

	return (
		!isCookiesWindowClosed && (
			<div className="fixed bottom-0 z-[2000] flex w-full justify-center p-6">
				<div className="w-[450px] rounded-md bg-green-spring-50/95 text-xs">
					<div className="flex items-center justify-between gap-4 rounded border border-mantis-700 p-4 px-6">
						<p className="text-left font-semibold text-green-spring-50 dark:text-green-spring-50 lg:text-green-spring-950">
							By using/registering to our website, you agree to our{" "}
							<Link
								className="text-green-spring-50 transition-colors duration-300 hover:text-bright-turquoise-500 hover:underline dark:text-green-spring-400 dark:hover:text-bright-turquoise-200 lg:text-green-spring-600"
								to="/privacy-policy#cookies-and-beacons"
								target="_blank"
								rel="noopener noreferrer"
							>
								Cookies Policy.
							</Link>
						</p>
						<button
							type="button"
							className="select-none rounded-md bg-mantis-600 px-5 py-3 text-sm capitalize tracking-wide text-green-spring-50 transition-colors duration-300 hover:bg-mantis-400 focus:outline-none focus:ring focus:ring-blue-300/80 sm:order-2 sm:w-auto"
							onClick={handleClick}
						>
							Accept
						</button>
					</div>
				</div>
			</div>
		)
	);
};

export default Cookies;
