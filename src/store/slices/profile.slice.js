import { USER_GET_BY_ID } from "../../constants";
import createAsyncSlice from "../helper/createAsyncSlice";

const slice = createAsyncSlice({
	name: "profile",
	fetchConfig: (userId) => USER_GET_BY_ID(userId),
});

export const fetchProfile = slice.asyncAction;
export default slice.reducer;
