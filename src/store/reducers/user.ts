import { AUTH_LOGIN } from "../../constants";
import { AppThunk } from "../configureStore";
import createAsyncSlice from "../helper/createAsyncSlice";

type UserCredentials = {
	email: string;
	password: string;
};

type AuthTokens = {
	accessToken: string;
	refreshToken: string;
};

const slice = createAsyncSlice({
	name: "",
	initialState: {
		loading: false,
		data: undefined,
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
				const tokens = actionResult.payload;
				if (tokens && tokens.accessToken)
					window.localStorage.setItem("accessToken", tokens.accessToken);
				else console.error("Authentication tokens are missing in the payload");
			}
		} catch (error) {
			dispatch(fetchError((error as Error).message));
		}
	};

export default slice.reducer;
