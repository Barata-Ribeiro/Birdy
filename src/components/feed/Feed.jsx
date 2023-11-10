import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadNewPhotos, resetFeedState } from "../../store/slices/feed.slice";
import Error from "../helpers/Error";
import Loading from "../helpers/Loading";
import FeedPhotos from "./FeedPhotos";

const Feed = ({ user }) => {
	const { infinite, loading, list, error } = useSelector((state) => state.feed);
	const dispatch = useDispatch();
	const wait = useRef(false);

	useEffect(() => {
		dispatch(resetFeedState());
		dispatch(loadNewPhotos({ user, limit: 6 }));
	}, [dispatch]);

	useEffect(() => {
		const infiniteScroll = () => {
			if (infinite) {
				const scroll = window.scrollY;
				const height = document.body.offsetHeight - window.innerHeight;
				if (scroll > height * 0.75 && !wait.current) {
					dispatch(loadNewPhotos({ user, limit: 6 }));
					wait.current = true;
					setTimeout(() => {
						wait.current = false;
					}, 500);
				}
			}
		};

		window.addEventListener("wheel", infiniteScroll);
		window.addEventListener("scroll", infiniteScroll);
		return () => {
			window.removeEventListener("wheel", infiniteScroll);
			window.removeEventListener("scroll", infiniteScroll);
		};
	}, [infinite, dispatch]);

	if (loading) return <Loading />;
	if (error) return <Error error={error} />;
	return (
		<>
			{/* <FeedModal /> */}

			{list.length > 0 && <FeedPhotos />}

			{!infinite && !user && (
				<p
					style={{
						textAlign: "center",
						padding: "2rem 0 4rem 0",
						color: "#888",
					}}
				>
					There are no new posts.
				</p>
			)}
		</>
	);
};

export default Feed;
