import { AUTH_LOGIN, AUTH_LOGOUT } from "../../constants";
import { AppThunk } from "../configureStore";
import createAsyncSlice from "../helper/createAsyncSlice";
import { refreshToken } from "./token";

type UserCredentials = {
	email: string;
	password: string;
};

const slice = createAsyncSlice({
	name: "user",
	initialState: {
		loading: false,
		data: null,
		error: null,
	},
	reducers: {},
	fetchConfig: (credentials: UserCredentials) => AUTH_LOGIN(credentials),
});

export const fetchUser = slice.asyncAction;
export const { resetState: resetUserState, fetchError } = slice.actions;

export const userLogin =
	(credentials: UserCredentials): AppThunk =>
	async (dispatch) => {
		try {
			const actionResult = await dispatch(fetchUser(credentials));
			if (actionResult?.payload) {
				const { accessToken, refreshToken, ...userData } = actionResult.payload;
				if (accessToken) {
					window.localStorage.setItem("accessToken", accessToken);
					dispatch(slice.actions.fetchSuccess(userData));
				} else
					console.error("Authentication tokens are missing in the payload");
			}
		} catch (error) {
			dispatch(fetchError((error as Error).message));
		}
	};

export const userLogout = (): AppThunk => async (dispatch) => {
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

export const autoLogin = (): AppThunk => async (dispatch, getState) => {
	const { token } = getState();

	if (token?.data?.token) {
		try {
			dispatch(refreshToken());
		} catch (error) {
			console.error("Error during auto login:", error);
			dispatch(userLogout());
		}
	}
};

export default slice.reducer;
