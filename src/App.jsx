import { Suspense, lazy, memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Lazy loading pages
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Sign = lazy(() => import("./pages/sign/Sign"));
const Dashboard = lazy(() => import("./pages/profile/Dashboard"));
const Photo = lazy(() => import("./pages/Photo"));
const User = lazy(() => import("./pages/User"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfUse = lazy(() => import("./pages/TermsOfUse"));
const NotFound = lazy(() => import("./pages/NotFound"));

import Footer from "./components/Footer";
import Header from "./components/Header";
import Cookies from "./components/helpers/Cookies";
import ProtectedRoute from "./components/helpers/ProtectedRoute";
import FloatingButton from "./components/shared/FloatingButton";
import ThemeSwitcher from "./components/shared/ThemeSwitcher";
import { autoLogin } from "./store/slices/user.slice";

const HeaderMemory = memo(() => <Header />);
HeaderMemory.displayName = "HeaderMemory";

const FooterMemory = memo(() => <Footer />);
FooterMemory.displayName = "FooterMemory";

const DashboardMemory = memo(() => <Dashboard />);
DashboardMemory.displayName = "DashboardMemory";

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(autoLogin());
		const intervalId = setInterval(() => {
			dispatch(autoLogin());
		}, [840000]);

		return () => clearInterval(intervalId);
	}, [dispatch]);

	return (
		<BrowserRouter>
			<HeaderMemory />
			<Cookies />

			<main className="md:container">
				<Suspense>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/about" element={<About />} />
						<Route path="/contact" element={<Contact />} />
						<Route path="sign/*" element={<Sign />} />
						<Route
							path="dashboard/:username/*"
							element={
								<ProtectedRoute>
									<DashboardMemory />
								</ProtectedRoute>
							}
						/>
						<Route path="photo/:photoId" element={<Photo />} />
						<Route path="user/:userId/:username" element={<User />} />
						<Route path="/privacy-policy" element={<PrivacyPolicy />} />
						<Route path="/terms-of-use" element={<TermsOfUse />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</Suspense>
			</main>
			<FooterMemory />
			<FloatingButton />
			<ThemeSwitcher />
		</BrowserRouter>
	);
}

export default App;
