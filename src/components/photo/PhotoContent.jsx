import PropTypes from "prop-types";
import { useState } from "react";
import { FaEye, FaRegComments } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import DeleteButton from "../../components/shared/DeleteButton";
import {
	adminDeletePhoto,
	userDeletePhoto,
} from "../../store/slices/photo.slice";
import Image from "../helpers/Image";
import LikeButton from "../shared/LikeButton";
import PhotoComments from "./PhotoComments";

const PhotoContent = ({ photo }) => {
	const [totalLikes, setTotalLikes] = useState(photo.meta.total_likes);
	const { data: token } = useSelector((state) => state.token);
	const user = useSelector((state) => state.user.data);
	const userId = user ? user.id : null;
	const isPhotoLiked =
		userId && photo.likes.some((like) => like.userId === userId);
	const isOwner = userId && photo.authorID === userId;
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handlePhotoDelete = async (photoId) => {
		if (user) {
			if (user.role === "admin")
				await dispatch(adminDeletePhoto(photoId, token));
			else await dispatch(userDeletePhoto(photoId, token));

			navigate(`/dashboard/${user.username}`);

			window.location.reload(true);
		}
	};

	return (
		<div className="grid grid-cols-1 justify-center gap-4 max-md:items-center max-md:px-1 md:grid-cols-2 lg:justify-between">
			<Image
				src={photo.imageUrl}
				alt={`Photo by ${photo.authorName}: ${photo.title}`}
				className="object-cover italic md:rounded-xl"
				title={`Photo by ${photo.authorName}: ${photo.title}`}
			/>
			<div className="flex flex-col gap-3 md:gap-5">
				{/* TITLE */}
				<div className="flex items-end justify-between">
					<div className="mb-2 flex flex-col items-start justify-start gap-1 leading-none">
						<h1 tabIndex="0" className="text-4xl font-semibold">
							{photo.title}
						</h1>
						<Link
							tabIndex="0"
							className="text-xs text-green-spring-400 dark:text-green-spring-300"
							to={`/user/${photo.authorID}/${photo.authorName}`}
							aria-label={`Author: ${photo.authorName}`}
						>
							@{photo.authorName}
						</Link>
					</div>
					{user && (photo.authorID === user.id || user.role === "admin") && (
						<DeleteButton
							onDelete={() => handlePhotoDelete(photo.id)}
							accessibilityText="Photo"
							direction="right"
						/>
					)}
				</div>

				{/* META NUMBERS */}
				<div className="order-first flex justify-between md:order-none md:justify-start md:gap-4">
					<span
						aria-label="Number of views"
						className="flex items-center gap-2"
					>
						<FaEye aria-hidden="true" />
						{photo.meta.total_hits}
					</span>
					<span
						aria-label="Number of likes and like button"
						className="flex items-center gap-1"
					>
						<LikeButton
							photoId={photo.id}
							token={token}
							totalLikes={totalLikes}
							setTotalLikes={setTotalLikes}
							isLiked={isPhotoLiked}
							isOwner={isOwner}
						/>
						{totalLikes}
					</span>
					<span
						aria-label="Number of comments"
						className="flex items-center gap-2"
					>
						<FaRegComments aria-hidden="true" />
						{photo.meta.total_comments}
					</span>
				</div>

				{/* META BIRD INFO */}
				<div className="grid grid-flow-row gap-4 border-y-2 border-green-spring-100 py-3 dark:border-green-spring-500 md:py-5">
					<p className="flex flex-col items-center gap-1 md:items-start">
						<span className="font-semibold dark:text-green-spring-300">
							Bird Size
						</span>
						<span className="font-normal">{photo.meta.birdSize} cm</span>
					</p>
					<p className="flex flex-col items-center gap-1 md:items-start">
						<span className="font-semibold dark:text-green-spring-300">
							Habitat
						</span>
						<span className="font-normal leading-relaxed">
							{photo.meta.birdHabitat}
						</span>
					</p>
				</div>

				{/* COMMENTS */}
				<PhotoComments id={photo.id} comments={photo.comments} />
			</div>
		</div>
	);
};

PhotoContent.propTypes = {
	photo: PropTypes.object.isRequired,
};

export default PhotoContent;
