import {
	AUTH_LOGIN,
	AUTH_LOGOUT,
	USER_GET_UPDATED_USERDATA,
} from "../../constants";
import createAsyncSlice from "../helper/createAsyncSlice";
import { refreshToken, setTokenData, tokenPurge } from "./token.slice";

export const isTokenExpired = (accessToken) => {
	try {
		const parts = accessToken.split(".");
		if (parts.length !== 3) return true;

		const payloadBase64 = parts[1];
		const decodedJson = atob(payloadBase64);
		const decoded = JSON.parse(decodedJson);
		const exp = decoded.exp;
		const now = Date.now().valueOf() / 1000;
		return now > exp;
	} catch (error) {
		return true;
	}
};

const slice = createAsyncSlice({
	name: "user",
	fetchConfig: (credentials) => AUTH_LOGIN(credentials),
});

export const fetchUser = slice.asyncAction;
const { resetState: resetUserState, fetchError } = slice.actions;
export const userPurge = () => ({ type: "user/purgeData" });

export const userLogin = (credentials) => async (dispatch) => {
	try {
		const actionResult = await dispatch(fetchUser(credentials));
		const { accessToken, refreshToken, ...userData } = actionResult.payload;
		if (accessToken && refreshToken) {
			dispatch(slice.actions.fetchSuccess(userData));
			dispatch(setTokenData(accessToken));
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
		if (!response.ok) throw new Error(response.statusText);

		dispatch(tokenPurge());
		dispatch(userPurge());

		if ("caches" in window) {
			await caches.keys().then((cacheNames) => {
				cacheNames.forEach((cacheName) => {
					caches.delete(cacheName);
				});
			});
		}
		window.location.reload(true);
	} catch (error) {
		console.error("Error during logout", error);
	}
};

export const autoLogin = () => async (dispatch, getState) => {
	const accessToken = getState().token.data;
	const userData = getState().user.data;

	if (accessToken && !isTokenExpired(accessToken) && userData)
		dispatch(slice.actions.fetchSuccess(userData));
	else if (accessToken && isTokenExpired(accessToken)) dispatch(refreshToken());
	else if (!accessToken && userData) dispatch(refreshToken());
};

export const updateUserdata = () => async (dispatch, getState) => {
	const token = getState().token.data;

	const { url, options } = USER_GET_UPDATED_USERDATA(token);

	try {
		const response = await fetch(url, options);
		if (response.ok) {
			const data = await response.json();
			dispatch(slice.actions.fetchSuccess(data));
		} else throw new Error(response.statusText);
	} catch (error) {
		dispatch(fetchError(error.message));
	}
};

export default slice.reducer;
