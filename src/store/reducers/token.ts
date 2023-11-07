import { AUTH_REFRESH_TOKEN } from "../../constants";
import { AppThunk } from "../configureStore";
import createAsyncSlice from "../helper/createAsyncSlice";

const slice = createAsyncSlice({
	name: "token",

	initialState: {
		loading: false,
		data: {
			token: window.localStorage.getItem("accessToken"),
		},
		error: null,
	},
	reducers: {},
	fetchConfig: () => AUTH_REFRESH_TOKEN(),
});

export const fetchToken = slice.asyncAction;
export const { resetState: resetTokenState } = slice.actions;

export const refreshToken = (): AppThunk => async (dispatch) => {
	try {
		const actionResult = await dispatch(fetchToken());

		if (actionResult?.payload) {
			const newAccessToken = actionResult.payload;
			if (newAccessToken && newAccessToken.token)
				window.localStorage.setItem("accessToken", newAccessToken.token);
			else console.error("New access token is missing in the payload");
		} else console.error("Token fetch was not fulfilled");
	} catch (error) {
		console.error("Error refreshing token:", error);
	}
};

export default slice.reducer;
