import { persistor } from "../configureStore";
import { refreshToken, resetTokenState } from "../slices/token.slice";
import { isTokenExpired } from "../slices/user.slice";

const tokenMiddleware =
	({ dispatch, getState }) =>
	(next) =>
	(action) => {
		if (action.type === "user/purgeData" || action.type === "token/purgeData") {
			persistor.pause();
			dispatch(resetTokenState());
			persistor.flush().then(() => {
				return persistor.purge();
			});
		}

		if (action.type === "token/checkExpiration") {
			const accessToken = getState().token.data;
			if (accessToken && isTokenExpired(accessToken)) dispatch(refreshToken());
		}

		return next(action);
	};

export default tokenMiddleware;
