import Feed from "../components/feed/Feed";
import Head from "../components/helpers/Head";

const Home = () => {
	return (
		<section className="my-4">
			<Head
				title="Feed"
				description="Welcome to the Birdy social network! This is the feed with all the photos from our users."
			/>

			<Feed />
		</section>
	);
};

export default Home;
