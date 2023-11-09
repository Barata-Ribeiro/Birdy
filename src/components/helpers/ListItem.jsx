import { NavLink } from "react-router-dom";

const ListItem = ({ children, ToLink, onClick }) => {
	return (
		<li>
			<NavLink
				to={ToLink}
				className={({ isActive }) =>
					isActive
						? `bg-mantis-200 flex rounded-sm px-2 py-2 text-base font-medium text-gray-900 lg:ml-12 lg:inline-flex`
						: `hover:text-bright-turquoise-500 flex py-2 text-base font-normal text-gray-900 lg:ml-12 lg:inline-flex`
				}
				onClick={onClick}
			>
				{children}
			</NavLink>
		</li>
	);
};

export default ListItem;
