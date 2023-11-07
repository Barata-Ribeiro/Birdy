import { PHOTO_POST } from "../../constants";
import createAsyncSlice from "../helper/createAsyncSlice";

const slice = createAsyncSlice({
	name: "photoPost",
	initialState: {
		loading: false,
		data: null,
		error: null,
	},
	reducers: {},
	fetchConfig: ({ token, formData }: { token: string; formData: FormData }) =>
		PHOTO_POST(token, formData),
});

export const photoPost = slice.asyncAction;

export default slice.reducer;
