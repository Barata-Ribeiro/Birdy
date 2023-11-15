import { useEffect } from "react";
import { FaUser, FaUserTie } from "react-icons/fa6";
import { Link, useNavigate, useParams } from "react-router-dom";
import Error from "../components/helpers/Error";
import Image from "../components/helpers/Image";
import Loading from "../components/helpers/Loading";
import { USER_GET_BY_ID } from "../constants";
import useFetch from "../hooks/useFetch";

const User = () => {
	const { userId } = useParams();
	const { data, error, loading, request } = useFetch();
	const navigate = useNavigate();

	useEffect(() => {
		if (userId) {
			const fetchOptions = USER_GET_BY_ID(userId);
			request(fetchOptions.url, fetchOptions.options);
		} else navigate("/");
	}, [userId, request, navigate]);

	if (loading) return <Loading />;
	if (error) return <Error error={error} />;
	if (data) {
		return (
			<section>
				<div className="relative h-[500px]">
					<div
						style={{
							backgroundImage: `url('${data.coverImageUrl}')`,
						}}
						className="absolute top-0 h-full w-full bg-cover bg-center"
					>
						<span
							id="blackOverlay"
							className="absolute h-full w-full bg-green-spring-950/50"
						></span>
					</div>
					<div
						className="pointer-events-none absolute inset-x-0 bottom-0 top-auto h-[70px] w-full overflow-hidden"
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
					<div className="container mx-auto px-4">
						<div className="relative -mt-64 mb-6 flex w-full min-w-0 flex-col gap-4 break-words rounded-lg bg-green-spring-50 shadow-xl">
							{/* PROFILE INFO */}
							<div className="px-6">
								<div className="flex flex-wrap justify-center">
									<div className="flex w-full justify-center px-4 lg:order-2 lg:w-3/12">
										<div className="relative">
											<img
												alt="..."
												src={`${data.avatarUrl}`}
												className="absolute -m-16 -ml-20 aspect-square h-36 w-36 max-w-[150px] rounded-full border-2 border-green-spring-50 object-cover object-center align-middle italic shadow-xl lg:-ml-16"
											/>
										</div>
									</div>
									{/* SEPARATOR */}
									<div className="w-full px-4 lg:order-3 lg:w-4/12 lg:self-center lg:text-right">
										<div className="mt-32 px-3 py-6 sm:mt-0">
											<span className="mb-1 sm:mr-2"></span>
										</div>
									</div>

									{/* INFO */}
									<div className="w-full px-4 lg:order-1 lg:w-4/12">
										<div className="flex justify-center py-4 pt-8 lg:pt-4">
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
													{data.likes.length}
												</span>
												<span className="text-sm text-green-spring-400">
													Likes
												</span>
											</div>
											<div className="p-3 text-center lg:mr-4">
												<span className="block text-xl font-bold uppercase tracking-wide text-green-spring-600">
													{data.comments.length}
												</span>
												<span className="text-sm text-green-spring-400">
													Comments
												</span>
											</div>
										</div>
									</div>
								</div>
								<div className="mt-12 flex flex-col items-center justify-center gap-2">
									<h3 className="flex items-center gap-1 text-4xl font-semibold leading-normal text-green-spring-700">
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
								<ul className="flex flex-wrap pb-4">
									{data.photos.map((photo) => (
										<li key={photo.id}>
											<Link to={`/photo/${photo.id}`}>
												<Image
													src={photo.imageUrl}
													alt={`${photo.title} from ${photo.authorName}`}
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
