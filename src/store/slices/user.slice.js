import { AUTH_LOGIN, AUTH_LOGOUT } from "../../constants";
import createAsyncSlice from "../helper/createAsyncSlice";
import { refreshToken } from "./token.slice";

const slice = createAsyncSlice({
	name: "user",
	initialState: {
		data: JSON.parse(window.localStorage.getItem("userData")) || null,
	},
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
			window.localStorage.setItem("userData", JSON.stringify(userData));
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
		if (response.ok) {
			window.localStorage.removeItem("accessToken");
			window.localStorage.removeItem("userData");
		} else console.error("Logout failed", response.status);
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
	const { token } = getState().token.data;
	const userData =
		getState().user.data || window.localStorage.getItem("userData");

	if (token && !isTokenExpired(token) && userData) {
		dispatch(slice.actions.fetchSuccess(userData));
	} else if (token && isTokenExpired(token)) {
		dispatch(refreshToken());
	}
};

export default slice.reducer;
