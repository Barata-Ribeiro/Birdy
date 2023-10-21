import { memo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Footer from "./components/Footer";
import Header from "./components/Header";

import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/profile/Dashboard";
import Sign from "./pages/sign/Sign";
import TermsOfUse from "./pages/TermsOfUse";

const HeaderMemory = memo(() => <Header />);
const FooterMemory = memo(() => <Footer />);

function App() {
	return (
		<BrowserRouter>
			<HeaderMemory />
			<main className="container">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="sign/*" element={<Sign />} />
					<Route path="dashboard/*" element={<Dashboard />} />
					<Route path="/terms-of-use" element={<TermsOfUse />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</main>
			<FooterMemory />
		</BrowserRouter>
	);
}

export default App;
