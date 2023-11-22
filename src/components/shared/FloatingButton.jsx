import { useEffect, useState } from "react";
import { FaAngleUp } from "react-icons/fa6";

const FloatingButton = () => {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const toggleVisibility = () => {
			if (
				window.scrollY >
				document.body.offsetHeight - window.innerHeight - 100
			)
				setIsVisible(true);
			else setIsVisible(false);
		};

		window.addEventListener("scroll", toggleVisibility);

		return () => window.removeEventListener("scroll", toggleVisibility);
	}, []);

	const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

	return (
		isVisible && (
			<button
				onClick={scrollToTop}
				className="fixed bottom-24 right-10 animate-bounce rounded-full bg-mantis-600 p-3 text-white shadow-lg transition duration-300 ease-in-out hover:bg-mantis-700 dark:bg-bright-turquoise-600 dark:hover:bg-bright-turquoise-700"
				aria-label="Back to top"
			>
				<FaAngleUp size={24} />
			</button>
		)
	);
};

export default FloatingButton;
