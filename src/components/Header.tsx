import React, { PropsWithChildren } from "react";
import "./Header.css";

const Navbar = () => {
	const [open, setOpen] = React.useState(false);

	return (
		<header className="flex w-full items-center bg-white">
			<div className="container">
				<div className="relative -mx-4 flex items-center justify-between">
					<div className="w-60 max-w-full px-4">
						<a href="/" className="block w-full py-5">
							<img
								src="https://jnrengineers.com.au/wp-content/uploads/2021/09/logo-6.svg"
								alt="logo"
								className="w-full"
							/>
						</a>
					</div>
					<div className="flex w-full items-center justify-between px-4">
						<div>
							<button
								onClick={() => setOpen(!open)}
								id="navbarToggler"
								className={`${open} absolute right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-0 focus:ring-2 lg:hidden`}
								aria-controls="primary-navigation"
								aria-expanded={open ? "true" : "false"}
							>
								<svg
									fill="hsl(103, 43%, 36%)"
									className="hamburger"
									viewBox="0 0 100 100"
									width="45"
								>
									<rect
										className="line top"
										width="80"
										height="10"
										x="10"
										y="25"
										rx="5"
									></rect>
									<rect
										className="line middle"
										width="80"
										height="10"
										x="10"
										y="45"
										rx="5"
									></rect>
									<rect
										className="line bottom"
										width="80"
										height="10"
										x="10"
										y="65"
										rx="5"
									></rect>
								</svg>
							</button>

							<nav
								// :className="!navbarOpen && 'hidden' "
								id="navbarCollapse"
								className={`absolute right-4 top-full z-50 w-full max-w-[250px] rounded-lg bg-white px-6 py-5 shadow lg:static lg:block lg:w-full lg:max-w-full lg:shadow-none ${
									!open && "hidden"
								} `}
							>
								<ul className="block lg:flex">
									<ListItem
										navItemStyles=" hover:text-bright-turquoise-500"
										NavLink="/#"
									>
										About
									</ListItem>
									<ListItem
										navItemStyles=" hover:text-bright-turquoise-500"
										NavLink="/#"
									>
										Contact
									</ListItem>
									<ListItem
										navItemStyles=" hover:text-bright-turquoise-500"
										NavLink="/#"
									>
										Repository
									</ListItem>
								</ul>
							</nav>
						</div>
						<div className="hidden justify-end pr-16 sm:flex lg:pr-0">
							<a
								href="/#"
								className=" px-7 py-3 text-base font-medium hover:text-bright-turquoise-500"
							>
								Sign in
							</a>

							<a
								href="/#"
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

type TypeListItemProps = {
	navItemStyles: string;
	NavLink: string;
};

const ListItem = ({
	children,
	navItemStyles,
	NavLink,
}: PropsWithChildren & TypeListItemProps) => {
	return (
		<>
			<li>
				<a
					href={NavLink}
					className={`flex py-2 text-base font-medium lg:ml-12 lg:inline-flex ${navItemStyles}`}
				>
					{children}
				</a>
			</li>
		</>
	);
};
