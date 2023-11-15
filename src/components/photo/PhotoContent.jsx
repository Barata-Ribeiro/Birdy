import PropTypes from "prop-types";
import { useState } from "react";
import { FaEye, FaHeart, FaRegComments } from "react-icons/fa";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Error from "../helpers/Error";
import Image from "../helpers/Image";
import FormButton from "../shared/FormButton";

const PhotoContent = ({ photo }) => {
	const [comment, setComment] = useState("");

	const { data, error, loading, request } = useFetch();

	const formatDate = (isoString) => {
		const date = new Date(isoString);
		const year = date.getFullYear();
		const month = (date.getMonth() + 1).toString().padStart(2, "0");
		const day = date.getDate().toString().padStart(2, "0");

		return `${month}/${day}/${year}`;
	};

	const handleCommentSubmit = (event) => {
		event.preventDefault();
	};

	return (
		<div className="grid grid-cols-1 max-xl:gap-4 max-md:px-1 md:grid-cols-2 lg:justify-between">
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
					<span className="flex items-center gap-2">
						<FaHeart />
						{photo.meta.total_likes}
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
				<div className="max-md:self-center">
					<h2 className="mb-4 text-xl font-medium">Comments</h2>
					{photo.comments.length > 0 ? (
						<ul className="flex flex-col gap-3">
							{photo.comments.map((comment) => (
								<li key={comment.id}>
									<p className="max-w-[50ch] font-medium">
										{comment.authorName}:{" "}
										<span className="font-normal">{comment.content}</span>
									</p>
									<p className="text-xs text-green-spring-300">
										{formatDate(comment.createdAt)}
									</p>
								</li>
							))}
						</ul>
					) : (
						<p className="mb-4 text-center font-semibold text-green-spring-300">
							This photo has no comments yet.
						</p>
					)}
					<form onSubmit={handleCommentSubmit}>
						<label className="sr-only capitalize" htmlFor="comment">
							Write your comment:
						</label>
						<textarea
							name="comment"
							placeholder="Add a comment..."
							rows="4"
							maxLength="350"
							minLength="50"
							className="bg-green-spring-50-50 h-20 w-full resize-x rounded-md border-2 border-green-spring-100 px-4 py-2 text-mantis-950 placeholder:text-green-spring-300 focus:border-bright-turquoise-500 focus:outline-none dark:bg-mantis-800 md:resize-y"
							value={comment}
							onChange={(e) => setComment(e.target.value)}
							aria-required="true"
							required
						/>
						<p className="mb-5 text-right text-xs">
							{350 - comment.length} characters remaining
						</p>
						<FormButton
							customClasses="px-4 py-2 rounded-md group-invalid:pointer-events-none group-invalid:opacity-30"
							isLoading={loading}
						>
							Comment
						</FormButton>
					</form>
					<Error error={error} />
				</div>
			</div>
		</div>
	);
};

PhotoContent.propTypes = {
	photo: PropTypes.object.isRequired,
};

export default PhotoContent;
