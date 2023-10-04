import { memo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Contact from "./pages/Contact";

const HeaderMemory = memo(() => <Header />);
const FooterMemory = memo(() => <Footer />);

function App() {
	return (
		<BrowserRouter>
			<HeaderMemory />
			<main className="AppBody">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route path="/contact" element={<Contact />} />
					{/* <Route path="singup/*" element={<Login />} />
					<Route
						path="dashboard/*"
						element={
							<ProtectedRoute>
								<User />
							</ProtectedRoute>
						}
					/> */}
					{/* <Route path="photo/:photoId" element={<Photo />} />
					<Route path="profile/:userId" element={<UserProfile />} /> */}
					<Route path="*" element={<NotFound />} />
				</Routes>
			</main>
			<FooterMemory />
		</BrowserRouter>
	);
}

export default App;
