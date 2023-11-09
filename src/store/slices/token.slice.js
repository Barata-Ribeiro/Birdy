import { AUTH_REFRESH_TOKEN } from "../../constants";
import createAsyncSlice from "../helper/createAsyncSlice";
import { userLogout } from "./user";

const slice = createAsyncSlice({
	name: "token",
	initialState: {
		data: {
			token: window.localStorage.getItem("accessToken") || null,
		},
	},
	fetchConfig: () => AUTH_REFRESH_TOKEN(),
});

export const fetchToken = slice.asyncAction;
export const { resetState: resetTokenState } = slice.actions;

export const refreshToken = () => async (dispatch) => {
	try {
		const actionResult = await dispatch(fetchToken());
		if (actionResult?.payload) {
			const newAccessToken = actionResult.payload;
			if (newAccessToken)
				window.localStorage.setItem("accessToken", newAccessToken.accessToken);
			else console.error("New access token is missing in the payload");
		} else {
			console.error("Token fetch was not fulfilled");
			dispatch(userLogout());
		}
	} catch (error) {
		console.error("Error refreshing token:", error);
		dispatch(userLogout());
	}
};

export default slice.reducer;
