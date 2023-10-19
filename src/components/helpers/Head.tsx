import { FC, useEffect } from "react";

interface HeadProps {
	title: string;
	description?: string;
}

const Head: FC<HeadProps> = (props) => {
	useEffect(() => {
		document.title = `${props.title} | Birdy`;

		const metaDescription = document.querySelector('meta[name="description"]');

		if (metaDescription)
			metaDescription.setAttribute("content", props.description || "");
	}, [props]);

	return <></>;
};

export default Head;
