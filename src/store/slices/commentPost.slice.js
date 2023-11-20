import { COMMENT_CREATE } from "../../constants";
import createAsyncSlice from "../helper/createAsyncSlice";

const slice = createAsyncSlice({
	name: "commentPost",
	fetchConfig: ({ photoId, token, comment }) =>
		COMMENT_CREATE(photoId, token, comment),
});

export const postPhotoComment = slice.asyncAction;

export default slice.reducer;
