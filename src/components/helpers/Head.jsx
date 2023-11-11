import PropTypes from "prop-types";
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

Head.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
};

export default Head;
