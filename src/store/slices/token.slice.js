import { AUTH_REFRESH_TOKEN } from "../../constants";
import createAsyncSlice from "../helper/createAsyncSlice";
import { userLogout } from "./user.slice";

const slice = createAsyncSlice({
	name: "token",
	fetchConfig: () => AUTH_REFRESH_TOKEN(),
});

export const fetchToken = slice.asyncAction;
export const { resetState: resetTokenState, fetchSuccess: setTokenData } =
	slice.actions;

export const checkTokenExpiration = () => ({ type: "token/checkExpiration" });
slice.actions.checkTokenExpiration = checkTokenExpiration;
export const tokenPurge = () => ({ type: "token/purgeData" });

export const refreshToken = () => async (dispatch) => {
	try {
		const actionResult = await dispatch(fetchToken());
		const newAccessToken = actionResult?.payload?.accessToken;
		if (newAccessToken) {
			dispatch(setTokenData(newAccessToken));
		} else {
			console.error("New access token is missing in the payload");
			dispatch(userLogout());
		}
	} catch (error) {
		console.error("Error refreshing token:", error);
		dispatch(userLogout());
	}
};

export default slice.reducer;
