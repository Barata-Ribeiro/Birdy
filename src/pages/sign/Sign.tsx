import { FaFolder, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { Route, Routes } from "react-router-dom";

import NotFound from "../NotFound";
import LostPassword from "./LostPassword";
import ResetPassword from "./ResetPassword";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const Login = () => {
	return (
		<section className="flex min-h-screen items-stretch text-mantis-50">
			{/* IMAGE */}
			<div
				className="relative hidden w-1/2 items-center bg-green-spring-500 bg-cover bg-no-repeat lg:flex"
				style={{
					backgroundImage: "url(https://source.unsplash.com/random/?bird)",
					backgroundSize: "cover",
					backgroundRepeat: "no-repeat",
					backgroundPosition: "center center",
				}}
			>
				<div className="absolute inset-0 z-0 bg-bright-turquoise-950 opacity-60"></div>
				<div className="z-10 w-full px-24">
					<h1 className="text-left text-5xl font-bold tracking-wide text-bright-turquoise-500">
						Keep it special
					</h1>
					<p className="my-4 text-3xl">
						Capture your personal memory in unique way, anywhere.
					</p>
				</div>
				<div className="absolute inset-x-0 bottom-0 flex justify-center space-x-4 p-4 text-center">
					<a
						href="https://github.com/Barata-Ribeiro/Birdy"
						className="text-mantis-50"
						target="_blank"
						rel="noopener noreferrer"
						title="Birdy - Repository"
					>
						<FaGithub size={24} />
					</a>
					<a
						href="https://www.linkedin.com/in/jo%C3%A3o-mendes-jorge-barata-ribeiro-645073118/"
						target="_blank"
						rel="noopener noreferrer"
						className="text-mantis-50"
						title="Barata Ribeiro - LinkedIn"
					>
						<FaLinkedinIn size={24} />
					</a>
					<a
						href="https://barataribeiro.com/"
						target="_blank"
						rel="noopener noreferrer"
						className="text-mantis-50"
						title="Barata Ribeiro - Portfolio"
					>
						<FaFolder size={24} />
					</a>
				</div>
			</div>

			{/* FORMS */}
			<div className="relative z-0 flex w-full items-center justify-center text-center dark:bg-green-spring-950 lg:w-1/2">
				<div
					className="absolute inset-0 z-10 items-center bg-gray-500 bg-cover bg-no-repeat lg:hidden"
					style={{
						backgroundImage: "url(https://source.unsplash.com/random/?bird)",
						backgroundSize: "cover",
						backgroundRepeat: "no-repeat",
						backgroundPosition: "center center",
					}}
				>
					<div className="absolute inset-0 z-0 bg-black opacity-60"></div>
				</div>
				<div className="z-20 w-full py-6">
					<Routes>
						<Route path="/up" element={<SignUp />} />
						<Route path="/in" element={<SignIn />} />
						<Route path="/password-lost" element={<LostPassword />} />
						<Route
							path="/password-reset/:userId/:token"
							element={<ResetPassword />}
						/>
						<Route path="*" element={<NotFound hideImage={true} />} />
					</Routes>
				</div>
			</div>
		</section>
	);
};

export default Login;
