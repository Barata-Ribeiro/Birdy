import { useSelector } from "react-redux";
import Feed from "../../components/feed/Feed";
import Head from "../../components/helpers/Head";

const ProfilePhotos = () => {
	const { data } = useSelector((state) => state.user);

	return (
		<section className="my-4">
			<Head
				title="Your Photos"
				description="In this page you'll find all the photos you have uploaded."
			/>

			<Feed user={data.id} />
		</section>
	);
};

export default ProfilePhotos;
