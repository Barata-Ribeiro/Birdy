import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Error from "../components/helpers/Error";
import Head from "../components/helpers/Head";
import Loading from "../components/helpers/Loading";
import PhotoContent from "../components/photo/PhotoContent";
import { fetchPhoto } from "../store/slices/photo.slice";

const Photo = () => {
	const { photoId } = useParams();
	const dispatch = useDispatch();
	const { loading, data, error } = useSelector((state) => state.photo);

	useEffect(() => {
		dispatch(fetchPhoto(photoId));
	}, [dispatch, photoId]);

	if (loading) return <Loading />;
	if (error) return <Error error={error} />;
	if (data)
		return (
			<section>
				<Head
					title={`${data.title}`}
					description={`This is the page of the photo ${data.title}.`}
				/>
				<PhotoContent />
			</section>
		);
};

export default Photo;
