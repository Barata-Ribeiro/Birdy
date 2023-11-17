import { GET_OWN_PROFILE_STATS } from "../../constants";
import createAsyncSlice from "../helper/createAsyncSlice";

const slice = createAsyncSlice({
	name: "profileStats",
	fetchConfig: (token) => GET_OWN_PROFILE_STATS(token),
});

export const fetchProfileStats = slice.asyncAction;

export default slice.reducer;
