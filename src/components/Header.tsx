import React from "react";
import { Link, NavLink } from "react-router-dom";

import "./Header.css";

import ListItem from "./helpers/ListItem";
import BurgerMenu from "../assets/BurgerMenu.svg?react";
import MainButton from "./shared/MainButton";

const links = {
	about: "/about",
	contact: "/contact",
	repository: "https://github.com/Barata-Ribeiro/Birdy",
};

const Navbar = () => {
	const [open, setOpen] = React.useState(false);
	const headerButtonsRef = React.useRef<HTMLDivElement>(null);
	const [showHeaderButtons, setShowHeaderButtons] = React.useState(false);

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	const handleLinkClick = () => setOpen(false);

	React.useEffect(() => {
		if (
			headerButtonsRef.current &&
			headerButtonsRef.current.offsetParent === null
		) {
			setShowHeaderButtons(true);
		} else {
			setShowHeaderButtons(false);
		}
	}, [open]);

	return (
		<header className="sticky top-0 z-50 flex w-full items-center bg-green-spring-50 shadow-sm dark:bg-green-spring-950">
			<div className="container">
				<div className="relative flex items-center justify-between">
					{/* LOGO */}
					<div className="w-60 max-w-full px-4">
						<a href="/" className="block w-full py-5">
							<img
								src="https://jnrengineers.com.au/wp-content/uploads/2021/09/logo-6.svg"
								alt="logo"
								className="w-full"
							/>
						</a>
					</div>

					{/* NAVLINKS */}
					<div className="flex w-full items-center justify-between px-4">
						<div>
							<button
								onClick={handleToggle}
								id="navbarToggler"
								className={`${open} absolute right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-0 focus:ring-2 lg:hidden`}
								aria-controls="primary-navigation"
								aria-expanded={open ? "true" : "false"}
								aria-label="Toggle navigation menu"
							>
								<BurgerMenu width="35" />
							</button>

							<nav
								id="navbarCollapse"
								className={`absolute right-4 top-full z-50 w-full max-w-[250px] rounded-lg 
                            bg-green-spring-50 px-6 py-5 shadow transition-all duration-300 ease-out 
                            lg:static lg:block lg:w-full 
                            lg:max-w-full lg:bg-transparent lg:shadow-none 
                            ${
															open
																? "visible translate-y-0 opacity-100"
																: "invisible -translate-y-10 opacity-0"
														}`}
								aria-label="Primary navigation"
							>
								<ul className="flex flex-col gap-2 lg:flex-row lg:gap-0">
									{Object.entries(links).map(([key, value]) => (
										<ListItem
											key={key}
											ToLink={value}
											onClick={handleLinkClick}
										>
											{key}
										</ListItem>
									))}
									{open && showHeaderButtons && (
										<>
											<li>
												<NavLink
													to="/sign/in"
													className={({ isActive }) =>
														isActive
															? "flex rounded-sm bg-mantis-200 px-2 py-2 text-base font-medium text-gray-900 lg:ml-12 lg:inline-flex"
															: "flex py-2 text-base font-normal text-gray-900 hover:text-bright-turquoise-500 lg:ml-12 lg:inline-flex"
													}
													onClick={handleLinkClick}
												>
													Sign In
												</NavLink>
											</li>
											<li>
												<NavLink
													to="/sign/up"
													className={({ isActive }) =>
														isActive
															? "flex rounded-sm bg-mantis-400 px-2 py-2 text-base font-medium text-gray-900 hover:text-bright-turquoise-500 lg:ml-12 lg:inline-flex"
															: "flex rounded-sm bg-mantis-600 px-2 py-2 text-base font-normal text-gray-900 lg:ml-12 lg:inline-flex"
													}
													onClick={handleLinkClick}
												>
													Sign Up
												</NavLink>
											</li>
										</>
									)}
								</ul>
							</nav>
						</div>

						{/* SIGN IN/UP BUTTONS */}
						<div
							ref={headerButtonsRef}
							id="headerButtons"
							className="hidden justify-end gap-2 pr-16 sm:flex lg:pr-0"
						>
							<Link
								to="/sign/in"
								className=" px-7 py-3 text-base hover:text-bright-turquoise-500"
							>
								Sign in
							</Link>

							<MainButton
								to={"/sign/up"}
								customClasses={"px-7 py-3 font-medium"}
							>
								Sign Up
							</MainButton>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Navbar;
