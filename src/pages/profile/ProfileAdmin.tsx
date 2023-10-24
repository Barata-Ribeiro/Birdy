import { useEffect, useState } from "react";

import Head from "../../components/helpers/Head";
import FormButton from "../../components/shared/FormButton";
import Input from "../../components/shared/Input";

const ProfileAdmin = () => {
	const [userInfo, setUserInfo] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const [progress, setProgress] = useState(0);
	const [deleteCompleted, setDeleteCompleted] = useState(false);

	useEffect(() => {
		let start: number | null = null;
		let animationFrameId: number | null = null;

		const step = (timestamp: number) => {
			if (start === null) start = timestamp;
			const progress = Math.round(Math.min((timestamp - start) / 50, 100));

			setProgress(progress);

			if (progress < 100) animationFrameId = requestAnimationFrame(step);
			else console.log("Deleted!");
		};

		if (isDeleting) {
			start = null;
			animationFrameId = requestAnimationFrame(step);
		}

		return () => {
			if (animationFrameId) cancelAnimationFrame(animationFrameId);
			setProgress(0);
		};
	}, [isDeleting]);

	const handleInteractionStart = () => setIsDeleting(true);
	const handleInteractionEnd = () => {
		setIsDeleting(false);
		if (progress === 100) setDeleteCompleted(true);
		else setProgress(0);
	};

	return (
		<section className="p-4 sm:px-0">
			<Head
				title="Admin Dashboard"
				description="This is the admin dashboard page. Here you can delete a User profile, and do other administrative tasks."
			/>
			<h1 className="text-center text-2xl">Manage Site</h1>
			<article className="mx-0 pt-4">
				<div id="get-user" className="flex flex-col gap-6">
					<form
						className="flex flex-col gap-4"
						onSubmit={(e) => {
							e.preventDefault();
							setUserInfo(!userInfo);
							console.log("get user");
						}}
					>
						<Input
							label={"Username"}
							type={"text"}
							name={"photoTitle"}
							inputClasses={
								"block w-full rounded-lg bg-mantis-200 dark:bg-mantis-800 p-4 text-lg placeholder:text-green-spring-400"
							}
						/>
						<FormButton customClasses="py-1 px-4 rounded-lg sm:!w-fit">
							Get User
						</FormButton>
					</form>
					<div
						id="user-info"
						className={`${
							userInfo ? "grid" : "hidden"
						}  grid-cols-[auto_1fr] items-center gap-4`}
					>
						<img
							src="https://source.unsplash.com/random/?selfie"
							className="h-40 w-40 rounded-full border-4 border-green-spring-50 object-cover"
							alt="avatar"
						/>
						<ul>
							<li>Id:</li>
							<li>Username:</li>
							<li>Email:</li>
							<li>Biography:</li>
							<li>Total Photos:</li>
							<li>Role:</li>
						</ul>
					</div>
				</div>
				<form
					className="mt-6 flex flex-col gap-4"
					onSubmit={(e) => {
						e.preventDefault();
						if (deleteCompleted) console.log("delete profile");
					}}
				>
					<Input
						label={"User Id"}
						type={"text"}
						name={"userId"}
						inputClasses={
							"block w-full rounded-lg bg-mantis-200 dark:bg-mantis-800 p-4 text-lg placeholder:text-green-spring-400"
						}
					/>
					<FormButton
						// Eventos do mouse
						onMouseDown={handleInteractionStart}
						onMouseUp={handleInteractionEnd}
						onMouseLeave={handleInteractionEnd}
						// Eventos de toque
						onTouchStart={handleInteractionStart}
						onTouchEnd={handleInteractionEnd}
						onTouchCancel={handleInteractionEnd}
						role="Delete Account"
						customClasses={`rounded py-1 px-4 rounded-lg sm:!w-fit !bg-red-600 hover:!bg-red-400 ${
							isDeleting ? "w-full" : ""
						}`}
					>
						{isDeleting ? `${progress}%` : "Delete"}
					</FormButton>
				</form>
			</article>
		</section>
	);
};

export default ProfileAdmin;
