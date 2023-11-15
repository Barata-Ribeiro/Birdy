import { memo, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Footer from "./components/Footer";
import Header from "./components/Header";

import { useDispatch } from "react-redux";
import Cookies from "./components/helpers/Cookies";
import ProtectedRoute from "./components/helpers/ProtectedRoute";
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
import { autoLogin } from "./store/slices/user.slice";

const HeaderMemory = memo(() => <Header />);
HeaderMemory.displayName = "HeaderMemory";

const FooterMemory = memo(() => <Footer />);
FooterMemory.displayName = "FooterMemory";

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(autoLogin());
	}, [dispatch]);

	return (
		<BrowserRouter>
			<HeaderMemory />
			<Cookies />

			<main className="container">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="sign/*" element={<Sign />} />
					<Route
						path="dashboard/:username/*"
						element={
							<ProtectedRoute>
								<Dashboard />
							</ProtectedRoute>
						}
					/>
					<Route path="photo/:photoId" element={<Photo />} />
					<Route path="user/:userId/:username" element={<User />} />
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
