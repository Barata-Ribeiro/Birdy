import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { TOGGLE_LIKE } from "../../constants";
import useFetch from "../../hooks/useFetch";
import "./LikeButton.css";

const LikeButton = ({
	photoId,
	token,
	totalLikes,
	setTotalLikes,
	isLiked,
	isOwner,
}) => {
	const [state, setState] = useState(isLiked ? "Liked" : "Unliked");
	const [usedKeyboard, setUsedKeyboard] = useState(false);
	const { request, loading } = useFetch();

	const toggleLike = async () => {
		if (!loading) {
			setState("Saving");
			const likeRequest = TOGGLE_LIKE(photoId, token);
			const { json } = await request(likeRequest.url, likeRequest.options);
			if (json?.isLiked) {
				setState("Liked");
				setTotalLikes(json.totalLikes);
			} else {
				setState("Unliked");
				setTotalLikes(json.totalLikes);
			}
		}
	};

	useEffect(() => {
		const handleTabPress = () => setUsedKeyboard(true);
		window.addEventListener("keydown", handleTabPress);
		return () => {
			window.removeEventListener("keydown", handleTabPress);
		};
	}, []);

	return (
		<button
			className={`like ${state.toLowerCase()} ${
				!usedKeyboard && "focus:outline-none"
			} disabled:cursor-not-allowed`}
			onClick={toggleLike}
			disabled={loading || isOwner || !token}
		>
			<span
				className={`like-icon like-icon-state`}
				aria-label={state}
				aria-live="polite"
			>
				{state}
			</span>
		</button>
	);
};

LikeButton.propTypes = {
	photoId: PropTypes.string.isRequired,
	token: PropTypes.string,
	totalLikes: PropTypes.number.isRequired,
	setTotalLikes: PropTypes.func.isRequired,
	isLiked: PropTypes.bool,
	isOwner: PropTypes.bool,
};

export default LikeButton;
