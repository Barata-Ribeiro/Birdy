import PropTypes from "prop-types";
import Head from "../components/helpers/Head";
import Image from "../components/helpers/Image";
import MainButton from "../components/shared/MainButton";

const NotFound = ({ hideImage = false }) => {
	return (
		<section className="flex items-center justify-center py-12 lg:py-24">
			<Head
				title="404"
				description="This isn't the page you're looking for..."
			/>
			<div className="lg:flex lg:gap-4">
				<div className="flex flex-col items-center justify-center md:py-24 lg:py-32">
					<h1 className="text-9xl font-bold text-mantis-600">404</h1>
					<p className="mb-2 text-center text-2xl font-bold md:text-3xl">
						<span className="text-bright-turquoise-600">Oops!</span> Page not
						found
					</p>
					<p className="mb-8 text-center text-gray-500 md:text-lg">
						The page you’re looking for doesn’t exist.
					</p>
					<MainButton to="/" customClasses="px-6 py-2 font-semibold">
						Go home
					</MainButton>
				</div>

				{!hideImage && (
					<div className="mt-4 lg:mt-0">
						<Image
							src="https://source.unsplash.com/random/?bird"
							alt="Random bird photograph from Unsplash, https://unsplash.com/"
							className="aspect-square max-h-[32rem] rounded-md object-cover"
						/>
					</div>
				)}
			</div>
		</section>
	);
};

NotFound.propTypes = {
	hideImage: PropTypes.bool,
};

export default NotFound;
