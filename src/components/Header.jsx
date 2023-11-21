import { useEffect, useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import useMedia from "../hooks/useMedia";
import { checkTokenExpiration } from "../store/slices/token.slice";
import { userLogout } from "../store/slices/user.slice";
import MainButton from "./shared/MainButton";

const links = {
	home: "/",
	about: "/about",
	contact: "/contact",
	repository: "https://github.com/Barata-Ribeiro/Birdy",
};

const Header = () => {
	const dispatch = useDispatch();
	const { data } = useSelector((state) => state.user);
	const isMobile = useMedia("(max-width: 64rem)");
	const [open, setOpen] = useState(!isMobile);

	useEffect(() => {
		setOpen(!isMobile);
	}, [isMobile]);

	const handleDashboardClick = () => {
		setOpen(!open);
		dispatch(checkTokenExpiration());
	};

	return (
		<header
			className="sticky top-0 z-50 border-b bg-green-spring-50 shadow-sm dark:bg-green-spring-950"
			role="banner"
		>
			<div className="px-6 lg:container md:px-12 lg:mx-auto lg:px-0 lg:py-4">
				<div className="flex items-center justify-between">
					<div
						// eslint-disable-next-line tailwindcss/classnames-order
						className="relative z-50 w-32 max-w-full xs:w-40 sm:w-52"
						role="img"
						aria-label="Birdy Logo"
					>
						<Link to="/" className="block w-full">
							<img
								src="https://upload.wikimedia.org/wikipedia/commons/9/93/No-logo.svg"
								alt="Birdy logo"
								className="w-full"
							/>
						</Link>
					</div>

					<div className="flex items-center justify-end border-l lg:border-l-0">
						<input
							type="checkbox"
							name="hamburger"
							checked={open}
							aria-checked={open}
							id="hamburger"
							className="peer hidden"
							onChange={() => setOpen(!open)}
							aria-controls="primary-navigation"
							aria-expanded={open ? "true" : "false"}
							aria-label="Toggle navigation menu"
							hidden
						/>
						<label
							htmlFor="hamburger"
							className="peer-checked:hamburger relative z-20 -mr-6 block cursor-pointer p-6 lg:hidden"
							role="button"
							aria-label="Toggle navigation"
						>
							<div
								aria-hidden="true"
								className="m-auto h-0.5 w-6 rounded bg-mantis-900 transition duration-300"
							></div>
							<div
								aria-hidden="true"
								className="m-auto mt-2 h-0.5 w-6 rounded bg-mantis-900 transition duration-300"
							></div>
						</label>

						<div className="fixed inset-0 w-[calc(100%-6rem)] translate-x-[-100%] border-r bg-white text-mantis-50 shadow-xl transition duration-300 peer-checked:translate-x-0 lg:static lg:w-auto lg:translate-x-0 lg:border-r-0 lg:bg-transparent lg:shadow-none">
							<nav
								className="flex h-full flex-col justify-between lg:flex-row lg:items-center"
								id="primary-navigation"
								role="navigation"
							>
								<ul className="space-y-8 px-6 pt-32 text-green-spring-700 md:px-12 lg:flex lg:space-x-12 lg:space-y-0 lg:pt-0">
									{Object.entries(links).map(([key, value]) => (
										<li key={key} className="w-fit">
											<NavLink
												className={({ isActive }) =>
													isActive
														? `rounded-md bg-mantis-200 px-4 py-1 text-base font-medium text-green-spring-900`
														: `text-base font-normal text-green-spring-900 hover:text-bright-turquoise-500`
												}
												to={value}
												target={key === "repository" ? "_blank" : "_self"}
												rel={key === "repository" ? "noopener noreferrer" : ""}
												role="link"
												onClick={() => setOpen(!open)}
											>
												<span className="relative">{key}</span>
											</NavLink>
										</li>
									))}
								</ul>

								<div className="border-t px-6 py-8 md:px-12 md:py-16 lg:border-l lg:border-t-0 lg:py-0 lg:pl-6 lg:pr-0">
									{!data ? (
										<>
											<Link
												to="/sign/in"
												className="px-7 py-3 text-base hover:text-bright-turquoise-500"
												role="link"
												onClick={() => setOpen(!open)}
											>
												Sign in
											</Link>
											<MainButton
												to={"/sign/up"}
												customClasses={"px-7 py-3 font-medium"}
												role="button"
												onClick={() => setOpen(!open)}
											>
												Sign Up
											</MainButton>
										</>
									) : (
										// eslint-disable-next-line tailwindcss/classnames-order
										<div className="flex flex-row items-center justify-between gap-4 max-xs:flex-col xs:gap-2">
											<Link
												to={`/dashboard/${data.username}`}
												className="inline-flex items-center gap-2 text-base font-normal text-green-spring-900 hover:text-bright-turquoise-500"
												onClick={handleDashboardClick}
												role="dashboard"
												aria-label="User Dashboard"
											>
												<img
													src={data.avatarUrl}
													className="dark:ring-green-sping-500 h-10 w-10 rounded-full p-1 ring-2 ring-green-spring-300"
													alt=""
												/>{" "}
												{data.username}
											</Link>
											<Link
												to="/sign/in"
												reloadDocument
												// eslint-disable-next-line tailwindcss/classnames-order
												className="border-green-spring-100 text-2xl text-green-spring-200 hover:text-green-spring-300 max-xs:border-t-2 max-xs:pt-4 lg:border-l-2 lg:pl-2 lg:text-xl"
												onClick={() => {
													setOpen(!open);
													dispatch(userLogout());
												}}
												role="log out"
												aria-label="Log out button"
											>
												<FaSignOutAlt />
											</Link>
										</div>
									)}
								</div>
							</nav>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
