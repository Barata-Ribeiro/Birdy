import { persistor } from "../configureStore";
import {
	refreshToken,
	resetTokenState,
	tokenPurge,
} from "../slices/token.slice";
import { userPurge } from "../slices/user.slice";

const tokenMiddleware =
	({ dispatch }) =>
	(next) =>
	(action) => {
		if (action.type === userPurge().type || action.type === tokenPurge().type) {
			persistor.pause();
			dispatch(resetTokenState());
			persistor.flush().then(() => persistor.purge());
		}

		if (
			action.type.endsWith("/fetchSuccess") ||
			action.type === refreshToken().type
		) {
			dispatch({ type: "token/checkExpiration" });
		}

		return next(action);
	};

export default tokenMiddleware;
