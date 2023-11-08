import { AUTH_LOGIN, AUTH_LOGOUT } from "../../constants";
import createAsyncSlice from "../helper/createAsyncSlice";
import { refreshToken } from "./token";

const slice = createAsyncSlice({
	name: "user",
	fetchConfig: (credentials) => AUTH_LOGIN(credentials),
});

export const fetchUser = slice.asyncAction;
const { resetState: resetUserState, fetchError } = slice.actions;

export const userLogin = (credentials) => async (dispatch) => {
	try {
		const actionResult = await dispatch(fetchUser(credentials));
		// eslint-disable-next-line no-unused-vars
		const { accessToken, refreshToken, ...userData } = actionResult.payload;
		if (accessToken) {
			window.localStorage.setItem("accessToken", accessToken);
			dispatch(slice.actions.fetchSuccess(userData));
		} else console.error("Authentication tokens are missing in the payload");
	} catch (error) {
		dispatch(fetchError(error.message));
	}
};

export const userLogout = () => async (dispatch) => {
	dispatch(resetUserState());
	const { url, options } = AUTH_LOGOUT();
	try {
		const response = await fetch(url, options);
		if (response.ok) window.localStorage.removeItem("accessToken");
		else console.error("Logout failed", response.status);
	} catch (error) {
		console.error("Error during logout", error);
	}
	window.localStorage.clear();
};

const isTokenExpired = (accessToken) => {
	try {
		const payloadBase64 = accessToken.split(".")[1];
		const decodedJson = atob(payloadBase64);
		const decoded = JSON.parse(decodedJson);
		const exp = decoded.exp;
		const now = Date.now().valueOf() / 1000;
		return now > exp;
	} catch (error) {
		return false;
	}
};

export const autoLogin = () => async (dispatch, getState) => {
	const { token } = getState();

	if (token?.data?.token && isTokenExpired(token?.data?.token)) {
		try {
			dispatch(refreshToken());
		} catch (error) {
			console.error("Error during auto login:", error);
			dispatch(userLogout());
		}
	}
};

export default slice.reducer;
