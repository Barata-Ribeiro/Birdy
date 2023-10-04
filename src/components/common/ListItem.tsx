import { ReactNode, PropsWithChildren } from "react";
import { NavLink } from "react-router-dom";

interface ListItemProps {
	ToLink: string;
	navItemStyles: string;
	children: ReactNode;
}

const ListItem = ({
	children,
	navItemStyles,
	ToLink,
}: PropsWithChildren<ListItemProps>) => {
	return (
		<li>
			<NavLink
				to={ToLink}
				className={`flex py-2 text-base font-medium lg:ml-12 lg:inline-flex ${navItemStyles} {isActive =>
    "nav-link" + (!isActive ? " bg-mantis-200" : "")
  }`}
			>
				{children}
			</NavLink>
		</li>
	);
};

export default ListItem;
