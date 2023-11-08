import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../store/redux-hooks";

const ProtectedRoute = ({ children }: React.PropsWithChildren) => {
	const { data } = useAppSelector((state) => state.token);

	return data ? children : data === null ? <Navigate to="/sign/up" /> : null;
};

export default ProtectedRoute;
