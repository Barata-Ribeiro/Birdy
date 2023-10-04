import React from "react";
import styles from "./Image.module.css";

interface ImageProps {
	alt: string;
	src: string;
}

const Image: React.FC<ImageProps> = ({ alt, ...props }) => {
	const [skeleton, setSkeleton] = React.useState(true);

	const handleLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
		const target = event.currentTarget;
		setSkeleton(false);
		target.style.opacity = "1";
	};

	return (
		<div className={styles.wrapper}>
			{skeleton && <div className={styles.skeleton}></div>}
			<img onLoad={handleLoad} className={styles.img} alt={alt} {...props} />
		</div>
	);
};

export default Image;
