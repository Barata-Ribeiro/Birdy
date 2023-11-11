import PropTypes from "prop-types";
import { useState } from "react";

const Image = ({ alt, ...props }) => {
	const [skeleton, setSkeleton] = useState(true);

	const handleLoad = (event) => {
		const target = event.currentTarget;
		setSkeleton(false);
		target.style.opacity = "1";
	};

	return (
		<div className="grid">
			{skeleton && (
				<div className="absolute h-full w-full animate-pulse bg-gradient-to-r from-green-spring-300 via-green-spring-50 to-green-spring-300"></div>
			)}
			<img
				onLoad={handleLoad}
				className="h-auto max-w-full bg-cover bg-no-repeat object-cover align-middle italic opacity-0 transition-opacity duration-200"
				alt={alt}
				{...props}
			/>
		</div>
	);
};

Image.propTypes = {
	alt: PropTypes.string.isRequired,
	props: PropTypes.object,
};

export default Image;
