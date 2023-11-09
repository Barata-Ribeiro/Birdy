import Head from "../components/helpers/Head";
import PhotoContent from "../components/photo/PhotoContent";

const Photo = () => {
	return (
		<section>
			<Head
				title="[Photo Title here]"
				description="This is the page of the photo [title here]."
			/>
			<PhotoContent />
		</section>
	);
};

export default Photo;
