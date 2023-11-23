import PropTypes from "prop-types";
import { useState } from "react";
import { FaEye, FaRegComments } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Image from "../helpers/Image";
import LikeButton from "../shared/LikeButton";
import PhotoComments from "./PhotoComments";

const PhotoContent = ({ photo }) => {
	const [totalLikes, setTotalLikes] = useState(photo.meta.total_likes);
	const { data: token } = useSelector((state) => state.token);
	const userId = useSelector((state) => state.user.data.id);
	const isPhotoLiked = photo.likes.some((like) => like.userId === userId);
	const isOwner = photo.authorID === userId;

	return (
		<div className="grid grid-cols-1 gap-4 max-md:px-1 md:grid-cols-2 lg:justify-between">
			<Image
				src={photo.imageUrl}
				alt={`Photo: ${photo.title}, from ${photo.authorName}`}
				className="object-cover italic md:rounded-xl"
				title={`Photo: ${photo.title}, from ${photo.authorName}`}
			/>
			<div className="flex flex-col gap-3 md:gap-5">
				{/* TITLE */}
				<div className="mb-2 flex flex-col items-start justify-start gap-0 leading-none">
					<h1 aria-label="Photo Title" className="text-4xl font-semibold">
						{photo.title}
					</h1>
					<Link
						aria-label="Photo Author"
						className="text-xs text-green-spring-400"
						to={`/user/${photo.authorID}/${photo.authorName}`}
					>
						@{photo.authorName}
					</Link>
				</div>

				{/* META NUMBERS */}
				<div className="order-first flex justify-between md:order-none md:justify-start md:gap-4">
					<span className="flex items-center gap-2">
						<FaEye />
						{photo.meta.total_hits}
					</span>
					<span className="flex items-center gap-1">
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
					<span className="flex items-center gap-2">
						<FaRegComments />
						{photo.meta.total_comments}
					</span>
				</div>

				{/* META BIRD INFO */}
				<div className="border-y-2 border-green-spring-100">
					<p className="pt-2 font-medium">
						Bird Size:{" "}
						<span className="font-normal">{photo.meta.birdSize}</span>
					</p>
					<p className="pb-2 pt-1 font-medium">
						Habitat:{" "}
						<span className="font-normal leading-normal">
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
