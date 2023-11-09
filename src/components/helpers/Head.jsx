import { useEffect } from "react";

const Head = (props) => {
	useEffect(() => {
		document.title = `${props.title} | Birdy`;

		const metaDescription = document.querySelector('meta[name="description"]');

		if (metaDescription)
			metaDescription.setAttribute("content", props.description || "");
	}, [props]);

	return <></>;
};

export default Head;
