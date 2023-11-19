import { persistor } from "../configureStore";
import { refreshToken } from "../slices/token.slice";
import { isTokenExpired } from "../slices/user.slice";

const tokenMiddleware =
	({ dispatch, getState }) =>
	(next) =>
	(action) => {
		if (action.type === "user/purgeData" || action.type === "token/purgeData") {
			persistor.purge();
			return;
		}

		if (action.type === "token/checkExpiration") {
			const accessToken = getState().token.data;
			if (accessToken && isTokenExpired(accessToken)) dispatch(refreshToken());
		}

		return next(action);
	};

export default tokenMiddleware;
