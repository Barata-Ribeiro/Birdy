import { memo, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Footer from "./components/Footer";
import Header from "./components/Header";

import Cookies from "./components/helpers/Cookies";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Photo from "./pages/Photo";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import User from "./pages/User";
import Dashboard from "./pages/profile/Dashboard";
import Sign from "./pages/sign/Sign";
import { autoLogin } from "./store/reducers/user";
import { useAppDispatch, useAppSelector } from "./store/useStore";

const HeaderMemory = memo(() => <Header />);
const FooterMemory = memo(() => <Footer />);

function App() {
	const count = useAppSelector((state) => state.counter);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(autoLogin());
	}, [dispatch]);

	return (
		<BrowserRouter>
			<HeaderMemory />
			<Cookies />
			<main className="container">
				<div className="flex flex-col items-center justify-center">
					<h1>Total: {count}</h1>
					<div className="flex gap-2">
						<button
							className="rounded-lg bg-mantis-300 px-4 py-2"
							onClick={() => dispatch({ type: "INCREMENT" })}
						>
							+
						</button>
						<button
							className="rounded-lg bg-mantis-300 px-4 py-2"
							onClick={() => dispatch({ type: "DECREMENT" })}
						>
							-
						</button>
					</div>
				</div>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="sign/*" element={<Sign />} />
					<Route path="dashboard/*" element={<Dashboard />} />
					<Route path="photo/:id" element={<Photo />} />
					<Route path="user/:id" element={<User />} />
					<Route path="/privacy-policy" element={<PrivacyPolicy />} />
					<Route path="/terms-of-use" element={<TermsOfUse />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</main>
			<FooterMemory />
		</BrowserRouter>
	);
}

export default App;
