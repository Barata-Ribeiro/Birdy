import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../../store/slices/user.slice";

const ProtectedRoute = ({ children }) => {
	const { data: token } = useSelector((state) => state.token);
	const { data: userData } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const userLogOut = () => {
		if (userData) dispatch(userLogout());
		navigate("/sign/in");
	};

	return token ? children : token === null ? userLogOut() : null;
};

ProtectedRoute.propTypes = {
	children: PropTypes.node,
};

export default ProtectedRoute;
