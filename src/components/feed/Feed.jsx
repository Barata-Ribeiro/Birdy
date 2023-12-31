import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { loadNewPhotos, resetFeedState } from "../../store/slices/feed.slice";
import Error from "../helpers/Error";
import Loading from "../helpers/Loading";
import FeedPhotos from "./FeedPhotos";

const Feed = ({ user }) => {
	const { username } = useParams();
	const { infinite, loading, list, error } = useSelector((state) => state.feed);
	const dispatch = useDispatch();
	const wait = useRef(false);

	useEffect(() => {
		dispatch(resetFeedState());
		dispatch(loadNewPhotos({ limit: 6, userId: user }));
	}, [dispatch, user]);

	useEffect(() => {
		const infiniteScroll = () => {
			if (infinite) {
				const scroll = window.scrollY;
				const height = document.body.offsetHeight - window.innerHeight;
				if (scroll > height * 0.75 && !wait.current) {
					dispatch(loadNewPhotos({ limit: 6, userId: user }));
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
	}, [infinite, dispatch, user]);

	if (loading) return <Loading />;
	if (error) return <Error error={error} />;
	return (
		<>
			{/* <FeedModal /> */}

			{list.length > 0 ? (
				<FeedPhotos />
			) : (
				<p className="mt-4 text-center text-lg text-gray-600">
					You have no photos! Go to{" "}
					<Link
						className="text-green-spring-50 transition-colors duration-300 hover:text-bright-turquoise-500 dark:text-green-spring-400 dark:hover:text-bright-turquoise-200 lg:text-green-spring-600"
						to={`/dashboard/${username}/upload`}
					>
						&apos;New Post&apos;
					</Link>{" "}
					to start sharing your photos!
				</p>
			)}

			{!infinite && !user && (
				<p className="pb-0 pl-8 pr-16 pt-4 text-center font-semibold text-green-spring-300">
					You have reached the end of the feed.
				</p>
			)}
		</>
	);
};

Feed.propTypes = {
	user: PropTypes.string,
};

export default Feed;
