import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import Head from "../../components/helpers/Head";
import FormButton from "../../components/shared/FormButton";
import Input from "../../components/shared/Input";
import {
	ADMIN_DELETE_USER_BY_ID,
	ADMIN_GET_USER_BY_USERNAME,
} from "../../constants";
import useFetch from "../../hooks/useFetch";

import Error from "../../components/helpers/Error";

const ProfileAdmin = () => {
	const [isDeleting, setIsDeleting] = useState(false);
	const [progress, setProgress] = useState(0);
	const [deleteCompleted, setDeleteCompleted] = useState(false);

	const [username, setUsername] = useState("");
	const [userId, setUserId] = useState(null);

	const { data, loading, error, request } = useFetch();
	const { data: token } = useSelector((state) => state.token);

	useEffect(() => {
		let start;
		let animationFrameId;

		const step = (timestamp) => {
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

	const handleFetchUserInfo = async (e) => {
		e.preventDefault();
		const userInfo = { username };
		const requestConfig = ADMIN_GET_USER_BY_USERNAME(userInfo, token);
		await request(requestConfig.url, requestConfig.options);
	};

	const handleDeleteUserById = async (e) => {
		e.preventDefault();
		const typedUserId = { userId };
		const requestConfig = ADMIN_DELETE_USER_BY_ID(typedUserId, token);
		if (deleteCompleted) {
			await request(requestConfig.url, requestConfig.options);
			window.location.reload(true);
		}
	};

	const UserInfoSkeleton = () => (
		<div
			id="user-info-skeleton"
			className="grid animate-skeleton grid-cols-1 items-center gap-4 md:grid-cols-[auto_1fr]"
		>
			<div className="h-40 w-40 rounded-full bg-green-spring-300" />
			<ul className="space-y-2">
				{Array.from({ length: 5 }).map((_, index) => (
					<li
						key={index}
						className="h-6 max-w-xs rounded bg-green-spring-300"
					/>
				))}
			</ul>
		</div>
	);

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
						className="group flex flex-col gap-4"
						onSubmit={handleFetchUserInfo}
					>
						<Input
							label={"Username"}
							type={"text"}
							name={"photoTitle"}
							onChange={(e) => setUsername(e.target.value)}
							inputClasses={
								"block w-full rounded-lg bg-mantis-200 dark:bg-mantis-800 p-4 text-lg placeholder:text-green-spring-400 dark:placeholder:text-green-spring-300"
							}
							required
							arial-required="true"
						/>
						<FormButton customClasses="py-1 px-4 rounded-lg sm:!w-fit group-invalid:pointer-events-none group-invalid:opacity-30">
							Get User
						</FormButton>
					</form>
					{loading ? (
						<UserInfoSkeleton />
					) : (
						data && (
							<div
								id="user-info"
								className="grid grid-cols-1 items-center gap-4 md:grid-cols-[auto_1fr]"
							>
								<img
									src={data.avatarUrl}
									className="h-40 w-40 rounded-full border-4 border-green-spring-50 object-cover italic"
									alt={`This is the avatar of ${data.username}`}
								/>
								<ul>
									<li className="font-semibold">
										Id: <span className="font-normal">{data.id}</span>
									</li>
									<li className="font-semibold">
										Username:{" "}
										<span className="font-normal">{data.username}</span>
									</li>
									<li className="font-semibold">
										Email: <span className="font-normal">{data.email}</span>
									</li>
									<li className="font-semibold">
										Biography:{" "}
										<span className="font-normal">
											{data.biography ? data.biography : "No Bio"}
										</span>
									</li>
									<li className="font-semibold">
										Total Photos:{" "}
										<span className="font-normal">{data.photos.length}</span>
									</li>
									<li className="font-semibold">
										Total Followers:{" "}
										<span className="font-normal">{data.followers.length}</span>
									</li>
									<li className="font-semibold">
										Total Followings:{" "}
										<span className="font-normal">
											{data.followings.length}
										</span>
									</li>
									<li className="font-semibold">
										Role: <span className="font-normal">{data.role}</span>
									</li>
								</ul>
							</div>
						)
					)}
				</div>
				<form
					className="group mt-6 flex flex-col gap-4"
					onSubmit={handleDeleteUserById}
				>
					<Input
						label={"User Id"}
						type={"text"}
						name={"userId"}
						onChange={(e) => setUserId(e.target.value)}
						inputClasses={
							"block w-full rounded-lg bg-mantis-200 dark:bg-mantis-800 p-4 text-lg placeholder:text-green-spring-400 dark:placeholder:text-green-spring-300"
						}
						required
						arial-required="true"
					/>
					<FormButton
						onPointerDown={handleInteractionStart}
						onPointerUp={handleInteractionEnd}
						onPointerLeave={handleInteractionEnd}
						role="Delete Account"
						customClasses={`rounded py-1 px-4 rounded-lg sm:!w-fit !bg-red-600 hover:!bg-red-400 group-invalid:pointer-events-none group-invalid:opacity-30 ${
							isDeleting ? "w-full" : ""
						}`}
					>
						{isDeleting ? `${progress}%` : "Delete"}
					</FormButton>
				</form>
			</article>
			<Error className="pt-5" error={error} />
		</section>
	);
};

export default ProfileAdmin;
