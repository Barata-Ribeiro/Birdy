import { AUTH_REFRESH_TOKEN } from "../../constants";
import createAsyncSlice from "../helper/createAsyncSlice";
import { userLogout } from "./user.slice";

const getInitialTokenState = () =>
	window.localStorage.getItem("accessToken") || null;

const slice = createAsyncSlice({
	name: "token",
	initialState: {
		data: getInitialTokenState(),
	},
	fetchConfig: () => AUTH_REFRESH_TOKEN(),
});

export const fetchToken = slice.asyncAction;
export const { resetState: resetTokenState } = slice.actions;

export const refreshToken = () => async (dispatch) => {
	try {
		const actionResult = await dispatch(fetchToken());
		if (actionResult?.payload?.accessToken) {
			const newAccessToken = actionResult.payload.accessToken;
			window.localStorage.setItem("accessToken", newAccessToken);
			dispatch(slice.actions.fetchSuccess(newAccessToken));
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
