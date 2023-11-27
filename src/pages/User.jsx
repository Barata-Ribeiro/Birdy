import { useEffect } from "react";
import { FaUser, FaUserTie } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Error from "../components/helpers/Error";
import Head from "../components/helpers/Head";
import Image from "../components/helpers/Image";
import Loading from "../components/helpers/Loading";
import MainButton from "../components/shared/MainButton";
import { fetchProfile } from "../store/slices/profile.slice";

const User = () => {
	const { userId } = useParams();
	const { data, error, loading, request } = useSelector(
		(state) => state.profile
	);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (userId) {
			dispatch(fetchProfile(userId));
		} else navigate("/");
	}, [userId, request, navigate, dispatch]);

	const totalLikesReceived = data
		? data.photos.reduce((sum, photo) => sum + photo.meta.total_likes, 0)
		: 0;

	const totalCommentsReceived = data
		? data.photos.reduce((sum, photo) => sum + photo.meta.total_comments, 0)
		: 0;

	const handleFollowing = (event) => {
		event.preventDefault();
	};

	if (loading) return <Loading />;
	if (error) return <Error error={error} />;
	if (data) {
		return (
			<section aria-labelledby="user-profile-title">
				<Head
					title={`${data.username}`}
					description={`This is the profile page of ${data.username}.`}
				/>
				<div className="relative block h-[500px]">
					<div
						style={{
							backgroundImage: `url('${data.coverImageUrl}')`,
						}}
						className="absolute top-0 h-full w-full bg-cover bg-center"
						aria-hidden="true"
					>
						<span
							id="blackOverlay"
							className="absolute h-full w-full bg-green-spring-950/50"
							aria-hidden="true"
						></span>
					</div>
					<div
						className="pointer-events-none absolute inset-x-0 bottom-0 top-auto h-[4.375rem] w-full overflow-hidden"
						style={{ transform: "translateZ(0)" }}
					>
						<svg
							className="absolute bottom-0 overflow-hidden"
							xmlns="http://www.w3.org/2000/svg"
							preserveAspectRatio="none"
							version="1.1"
							viewBox="0 0 2560 100"
							x="0"
							y="0"
						>
							<polygon
								className="fill-current text-green-spring-50"
								points="2560 0 2560 100 0 100"
							></polygon>
						</svg>
					</div>
				</div>

				<div className="relative py-16">
					<div className="container mx-auto md:px-4">
						<div className="relative -mt-64 mb-6 flex w-full min-w-0 flex-col gap-4 break-words rounded-lg bg-green-spring-50 shadow-xl">
							{/* PROFILE INFO */}
							<div className="px-6">
								<div className="flex flex-wrap justify-center">
									<div className="flex w-full justify-center px-4  lg:order-2 lg:w-3/12">
										<div className="relative">
											<img
												alt={`Avatar of ${data.username}`}
												title={`Avatar of ${data.username}`}
												src={`${data.avatarUrl}`}
												className="absolute left-1/2 top-1/2 aspect-square h-36 w-36 max-w-[150px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-green-spring-50 object-cover object-center align-middle italic shadow-xl lg:-mt-12"
											/>
										</div>
									</div>

									{/* FOLLOWERS INFO */}
									<div className="w-full lg:order-3 lg:w-4/12 lg:self-center lg:text-right">
										<div className="mt-16 flex items-center justify-between px-3 py-6 sm:mt-0">
											<MainButton
												customClasses="px-4 py-2"
												onClick={handleFollowing}
												disabled={!data}
												aria-disabled={!data}
											>
												Follow
											</MainButton>
											<span className="dark:text-green-spring-600">
												{data.totalFollowers} follower(s)
											</span>
										</div>
									</div>

									{/* INFO */}
									<div className="w-full px-4 lg:order-1 lg:w-4/12">
										<div className="flex justify-center py-4 lg:pt-4">
											<div className="mr-4 p-3 text-center">
												<span className="block text-xl font-bold uppercase tracking-wide text-green-spring-600">
													{data.photos.length}
												</span>
												<span className="text-sm text-green-spring-400">
													Photos
												</span>
											</div>
											<div className="mr-4 p-3 text-center">
												<span className="block text-xl font-bold uppercase tracking-wide text-green-spring-600">
													{totalLikesReceived}
												</span>
												<span className="text-sm text-green-spring-400">
													Likes
												</span>
											</div>
											<div className="p-3 text-center lg:mr-4">
												<span className="block text-xl font-bold uppercase tracking-wide text-green-spring-600">
													{totalCommentsReceived}
												</span>
												<span className="text-sm text-green-spring-400">
													Comments
												</span>
											</div>
										</div>
									</div>
								</div>

								{/* INFO 2 */}
								<div className="mt-6 flex flex-col items-center justify-center gap-2 lg:mt-12">
									<h3
										id="user-profile-title"
										className="flex items-center gap-1 text-4xl font-semibold leading-normal text-green-spring-700 dark:text-green-spring-700"
									>
										{data.username}{" "}
										{data.role === "admin" ? (
											<FaUserTie size={20} />
										) : (
											<FaUser size={20} />
										)}
									</h3>
									<p className="flex items-center gap-2 text-sm font-bold leading-normal text-green-spring-300">
										{data.email}
									</p>
									<p className="mt-2 text-center leading-7 text-green-spring-600">
										{data.biography}
									</p>
								</div>
							</div>
							<hr className="w-2/3 self-center" />

							{/* PHOTOS */}
							{data.photos.length > 0 ? (
								<ul className="flex flex-wrap items-center justify-center pb-4">
									{data.photos.map((photo) => (
										<li key={photo.id}>
											<Link to={`/photo/${photo.id}`}>
												<Image
													src={photo.imageUrl}
													alt={`${photo.title} by ${photo.authorName}`}
													className="h-60 w-60 object-cover object-center align-middle grayscale hover:grayscale-0"
												/>
											</Link>
										</li>
									))}
								</ul>
							) : (
								<p className="pb-4 pl-8 pr-16 text-center font-semibold text-green-spring-300">
									This user has no photos.
								</p>
							)}
						</div>
					</div>
				</div>
			</section>
		);
	}
};

export default User;
