import {
	ADMIN_DELETE_COMMENT_BY_ID,
	COMMENT_CREATE,
	COMMENT_DELETE_BY_ID,
} from "../../constants";
import createAsyncSlice from "../helper/createAsyncSlice";

const slice = createAsyncSlice({
	name: "commentPost",
	fetchConfig: ({ photoId, token, comment }) =>
		COMMENT_CREATE(photoId, token, comment),
});

export const postPhotoComment = slice.asyncAction;
const { resetState: resetCommentState, fetchError } = slice.actions;

export const userDeleteComment =
	(photoId, commentId, token) => async (dispatch) => {
		const { url, options } = COMMENT_DELETE_BY_ID(photoId, commentId, token);

		try {
			const response = await fetch(url, options);
			if (!response.ok) throw new Error(response.statusText);
			dispatch(resetCommentState());
		} catch (error) {
			dispatch(fetchError(error.message));
		}
	};

export const adminDeleteComment =
	(photoId, commentId, token) => async (dispatch) => {
		const { url, options } = ADMIN_DELETE_COMMENT_BY_ID(
			photoId,
			commentId,
			token
		);

		try {
			const response = await fetch(url, options);
			if (!response.ok) throw new Error(response.statusText);
			dispatch(resetCommentState());
		} catch (error) {
			dispatch(fetchError(error.message));
		}
	};

export default slice.reducer;
