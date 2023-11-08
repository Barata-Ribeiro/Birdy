import { useEffect, useRef } from "react";
import { loadNewPhotos, resetFeedState } from "../../store/features/feed";
import { useAppDispatch, useAppSelector } from "../../store/redux-hooks";
import Error from "../helpers/Error";
import FeedPhotos from "./FeedPhotos";

const Feed = ({ user = "0" }) => {
	const { infinite, loading, list, error } = useAppSelector(
		(state) => state.feed
	);
	const { data } = useAppSelector((state) => state.user);
	const dispatch = useAppDispatch();
	const wait = useRef(false);

	useEffect(() => {
		dispatch(resetFeedState());
		dispatch(loadNewPhotos({ userId: data.id, limit: 6 }));
	}, [dispatch, data]);

	useEffect(() => {
		const infiniteScroll = () => {
			if (infinite) {
				const scroll = window.scrollY;
				const height = document.body.offsetHeight - window.innerHeight;
				if (scroll > height * 0.75 && !wait.current) {
					dispatch(loadNewPhotos({ userId: data.id, limit: 6 }));
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
	}, [infinite, dispatch, data]);

	if (loading) return <p>Loading...</p>;
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
					Não existem mais postagens.
				</p>
			)}
		</>
	);
};

export default Feed;
