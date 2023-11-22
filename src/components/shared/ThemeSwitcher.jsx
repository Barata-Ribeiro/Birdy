import { useEffect, useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const ThemeSwitcher = () => {
	const [theme, setTheme] = useState(
		localStorage.getItem("theme") ||
			(window.matchMedia("(prefers-color-scheme: dark)").matches
				? "dark"
				: "light")
	);

	useEffect(() => {
		document.documentElement.classList.toggle("dark", theme === "dark");
		localStorage.setItem("theme", theme);
	}, [theme]);

	const toggleTheme = () => {
		setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
	};

	return (
		<button
			onClick={toggleTheme}
			className="fixed bottom-0 left-0 m-4 rounded-full bg-bright-turquoise-500/60 p-2 text-white shadow-lg dark:bg-mantis-600/60"
			aria-label="Toggle Theme"
		>
			{theme === "light" ? <MdLightMode /> : <MdDarkMode />}
		</button>
	);
};

export default ThemeSwitcher;
