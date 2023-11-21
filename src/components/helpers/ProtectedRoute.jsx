import PropTypes from "prop-types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../../store/slices/user.slice";

const ProtectedRoute = ({ children }) => {
	const { data: token } = useSelector((state) => state.token);
	const { data: userData } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (token === null && !userData) {
			dispatch(userLogout());
			navigate("/sign/in");
		}
	}, [token, userData, dispatch, navigate]);

	return token ? children : null;
};

ProtectedRoute.propTypes = {
	children: PropTypes.node,
};

export default ProtectedRoute;
