import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const ListItem = ({ children, ToLink, onClick }) => {
	return (
		<li>
			<NavLink
				to={ToLink}
				className={({ isActive }) =>
					isActive
						? `flex rounded-sm bg-mantis-200 px-2 py-2 text-base font-medium text-gray-900 lg:ml-12 lg:inline-flex`
						: `flex py-2 text-base font-normal text-gray-900 hover:text-bright-turquoise-500 lg:ml-12 lg:inline-flex`
				}
				onClick={onClick}
			>
				{children}
			</NavLink>
		</li>
	);
};

ListItem.propTypes = {
	children: PropTypes.node.isRequired,
	ToLink: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
};

export default ListItem;
