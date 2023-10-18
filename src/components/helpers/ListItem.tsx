import { NavLink } from "react-router-dom";

interface ListItemProps {
	ToLink: string;
	onClick: React.MouseEventHandler<HTMLAnchorElement> | undefined;
}

const ListItem = ({
	children,
	ToLink,
	onClick,
}: React.PropsWithChildren<ListItemProps>) => {
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

export default ListItem;
