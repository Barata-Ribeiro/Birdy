import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postPhotoComment } from "../../store/slices/commentPost.slice";
import Error from "../helpers/Error";
import FormButton from "../shared/FormButton";

const PhotoComments = (props) => {
	const [comments, setComments] = useState(() => props.comments);
	const commentsSection = useRef(null);
	const [comment, setComment] = useState("");

	const commentPost = useSelector((state) => state.commentPost);
	const { data: token } = useSelector((state) => state.token);
	const dispatch = useDispatch();

	useEffect(() => {
		commentsSection.current.scrollTop = commentsSection.current.scrollHeight;
	}, [comments]);

	const formatDate = (isoString) => {
		const date = new Date(isoString);
		const year = date.getFullYear();
		const month = (date.getMonth() + 1).toString().padStart(2, "0");
		const day = date.getDate().toString().padStart(2, "0");

		return `${month}/${day}/${year}`;
	};

	const handleCommentSubmit = async (event) => {
		event.preventDefault();
		const action = await dispatch(
			postPhotoComment({
				photoId: props.id,
				token,
				comment,
			})
		);
		setComment("");
		if (action.payload && action.payload.photoId === props.id) {
			setComments((prevComments) => [...prevComments, action.payload]);
		}
	};

	return (
		<div className="max-md:self-center">
			<h2 className="mb-4 text-xl font-medium">Comments</h2>
			<ul className="mb-3 flex flex-col gap-3" ref={commentsSection}>
				{comments.length > 0 ? (
					comments.map((comment) => (
						<li key={comment.id}>
							<p className="max-w-[50ch] font-medium">
								{comment.authorName}:{" "}
								<span className="font-normal">{comment.content}</span>
							</p>
							<p className="select-none text-xs text-green-spring-300">
								{formatDate(comment.createdAt)}
							</p>
						</li>
					))
				) : (
					<li className="mb-4 text-center font-semibold text-green-spring-300">
						This photo has no comments yet.
					</li>
				)}
			</ul>
			<form onSubmit={handleCommentSubmit}>
				<label className="sr-only capitalize" htmlFor="comment">
					Write your comment:
				</label>
				<textarea
					id="comment"
					name="comment"
					placeholder="Add a comment..."
					rows="4"
					maxLength="350"
					minLength="50"
					className="bg-green-spring-50-50 h-20 w-full resize-x rounded-md border-2 border-green-spring-100 px-4 py-2 text-mantis-950 placeholder:text-green-spring-300 focus:border-bright-turquoise-500 focus:outline-none dark:bg-mantis-800 md:resize-y"
					value={comment}
					onChange={({ target }) => setComment(target.value)}
					aria-required="true"
					required
				/>
				<p className="mb-5 text-right text-xs">
					{350 - comment.length} characters remaining
				</p>
				<FormButton
					customClasses="px-4 py-2 rounded-md group-invalid:pointer-events-none group-invalid:opacity-30"
					isLoading={commentPost.loading}
				>
					Comment
				</FormButton>
			</form>
			<Error error={commentPost.error} />
		</div>
	);
};

PhotoComments.propTypes = {
	comments: PropTypes.array.isRequired,
	id: PropTypes.string.isRequired,
};

export default PhotoComments;
