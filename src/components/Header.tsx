import React from "react";

import "./Header.css";

import ListItem from "./common/ListItem";

import BurgerMenu from "../assets/BurgerMenu.svg?react";

const links = {
	about: "/about",
	contact: "/contact",
	repository: "https://github.com/Barata-Ribeiro/Birdy",
};

const Navbar = () => {
	const [open, setOpen] = React.useState(false);

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	return (
		<header className="flex w-full items-center bg-white">
			<div className="container">
				<div className="relative -mx-4 flex items-center justify-between">
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
								className={`absolute right-4 top-full z-50 w-full 
                max-w-[250px] rounded-lg bg-white px-6 py-5 shadow 
                lg:static lg:block lg:w-full lg:max-w-full 
                lg:shadow-none ${!open && "hidden"} `}
								aria-label="Primary navigation"
							>
								<ul className="block lg:flex">
									{Object.entries(links).map(([key, value]) => (
										<ListItem
											key={key}
											ToLink={value}
											navItemStyles="text-gray-900"
										>
											{key}
										</ListItem>
									))}
								</ul>
							</nav>
						</div>

						{/* SIGN IN/UP BUTTONS */}
						<div className="hidden justify-end pr-16 sm:flex lg:pr-0">
							<a
								href="/sign-in"
								className=" px-7 py-3 text-base font-medium hover:text-bright-turquoise-500"
							>
								Sign in
							</a>

							<a
								href="/sign-up"
								className="rounded-lg bg-mantis-600 px-7 py-3 text-base font-medium text-white hover:bg-mantis-400"
							>
								Sign Up
							</a>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Navbar;
