import { PHOTO_POST } from "../../constants";
import createAsyncSlice from "../helper/createAsyncSlice";

const slice = createAsyncSlice({
	name: "photoPost",
	fetchConfig: ({ token, formData }) => PHOTO_POST(token, formData),
});

export const photoPosting = slice.asyncAction;

export default slice.reducer;
