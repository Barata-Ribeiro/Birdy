import { FC, SyntheticEvent, useState } from "react";

interface ImageProps {
	alt: string;
	src: string;
	className?: string;
}

const Image: FC<ImageProps> = ({ alt, ...props }) => {
	const [skeleton, setSkeleton] = useState(true);

	const handleLoad = (event: SyntheticEvent<HTMLImageElement>) => {
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

export default Image;
