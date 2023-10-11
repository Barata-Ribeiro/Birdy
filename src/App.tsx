import { memo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Sign from "./pages/sign/Sign";
import Dashboard from "./pages/profile/Dashboard";

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
					<Route path="*" element={<NotFound />} />
				</Routes>
			</main>
			<FooterMemory />
		</BrowserRouter>
	);
}

export default App;
