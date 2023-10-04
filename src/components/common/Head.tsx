import React from "react";

interface HeadProps {
	title: string;
	description?: string;
}

const Head: React.FC<HeadProps> = (props) => {
	React.useEffect(() => {
		document.title = `${props.title} | Birdy`;

		const metaDescription = document.querySelector('meta[name="description"]');

		if (metaDescription)
			metaDescription.setAttribute("content", props.description || "");
	}, [props]);

	return <></>;
};

export default Head;
