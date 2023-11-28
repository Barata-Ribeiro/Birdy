import { USER_GET_BY_ID } from "../../constants";
import createAsyncSlice from "../helper/createAsyncSlice";

const slice = createAsyncSlice({
	name: "profile",
	reducers: {
		updateTotalFollowers(state, action) {
			if (state.data && state.data.id === action.payload.userId)
				state.data.totalFollowers += action.payload.change;
		},
	},
	fetchConfig: (userId) => USER_GET_BY_ID(userId),
});

export const fetchProfile = slice.asyncAction;
export const { updateTotalFollowers } = slice.actions;
export default slice.reducer;
