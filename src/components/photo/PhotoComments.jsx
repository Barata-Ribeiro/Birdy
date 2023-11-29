import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	adminDeleteComment,
	postPhotoComment,
	userDeleteComment,
} from "../../store/slices/commentPost.slice";
import Error from "../helpers/Error";
import DeleteButton from "../shared/DeleteButton";
import FormButton from "../shared/FormButton";

const PhotoComments = (props) => {
	const [comments, setComments] = useState(() => props.comments);
	const commentsSection = useRef(null);
	const [comment, setComment] = useState("");

	const commentPost = useSelector((state) => state.commentPost);
	const { data: token } = useSelector((state) => state.token);
	const user = useSelector((state) => state.user.data);
	const dispatch = useDispatch();

	useEffect(() => {
		commentsSection.current.scrollTop = commentsSection.current.scrollHeight;
	}, [comments]);

	const formatDate = (isoString) => {
		const options = { year: "numeric", month: "short", day: "numeric" };
		return new Date(isoString).toLocaleDateString("en-US", options);
	};

	const handleCommentSubmit = async (event) => {
		event.preventDefault();
		if (user && token) {
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
		}
	};

	const handleCommentDelete = async (commentId) => {
		if (user) {
			if (user.role === "admin")
				await dispatch(adminDeleteComment(props.id, commentId, token));
			else await dispatch(userDeleteComment(props.id, commentId, token));

			setComments(comments.filter((comment) => comment.id !== commentId));
		}
	};

	return (
		<>
			<h2 className="mb-2 font-heading text-xl font-medium">Comments</h2>
			<ul
				ref={commentsSection}
				className="max-h-96 space-y-2 overflow-y-auto"
				aria-live="polite"
			>
				{comments.map((comment) => (
					<li
						key={comment.id}
						className="grid grid-flow-row gap-2 border-b border-green-spring-100 p-2 last:border-b-0 dark:border-green-spring-500"
					>
						<div className="flex items-center justify-between">
							<span className="font-body text-sm font-medium dark:text-green-spring-300">
								{comment.authorName}
							</span>
							<time
								dateTime={comment.createdAt}
								className="text-xs text-green-spring-300 dark:text-green-spring-500"
							>
								{formatDate(comment.createdAt)}
							</time>
						</div>
						<p className="font-normal">{comment.content}</p>
						{user &&
							(comment.authorID === user.id || user.role === "admin") && (
								<span>
									<DeleteButton
										onDelete={() => handleCommentDelete(comment.id)}
										accessibilityText="Comment"
										direction="left"
									/>
								</span>
							)}
					</li>
				))}
			</ul>
			{comments.length === 0 && (
				<p className="text-center text-sm text-green-spring-300">
					This photo has no comments yet.
				</p>
			)}
			<form
				onSubmit={handleCommentSubmit}
				className="mt-4"
				aria-label="Post a comment"
			>
				<textarea
					id="comment"
					name="comment"
					placeholder="Add a comment..."
					rows="3"
					maxLength="350"
					minLength="50"
					className="w-full rounded-md border border-green-spring-100 p-2 text-mantis-950 placeholder:text-green-spring-400 focus:border-bright-turquoise-500 focus:outline-none"
					value={comment}
					onChange={({ target }) => setComment(target.value)}
					aria-required="true"
					aria-label="Comment text"
					required
				/>
				<div className="mt-2 flex items-center justify-between">
					<p className="text-xs" aria-live="assertive">
						{350 - comment.length} characters remaining
					</p>
					<FormButton customClasses="rounded-md bg-mantis-600 text-white hover:bg-mantis-700 disabled:opacity-50 py-2">
						Comment
					</FormButton>
				</div>
			</form>
			<Error error={commentPost.error} />
		</>
	);
};

PhotoComments.propTypes = {
	comments: PropTypes.array.isRequired,
	id: PropTypes.string.isRequired,
};

export default PhotoComments;
