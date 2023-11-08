import { PHOTOS_GET_ALL } from "../../constants";
import createAsyncSlice from "../helper/createAsyncSlice";

const slice = createAsyncSlice({
	name: "feed",
	initialState: {
		list: [],
		pages: 1,
		infinite: true,
	},
	reducers: {
		addPhotos(state, action) {
			state.list.push(...action.payload);
			if (action.payload.length === 0) state.infinite = false;
		},
		addPage(state) {
			state.pages++;
		},
		resetState(state) {
			state.infinite = true;
			state.pages = 1;
			state.list = [];
			state.data = null;
			state.error = null;
			state.loading = false;
		},
	},
	fetchConfig: ({ page, limit, userId }) =>
		PHOTOS_GET_ALL({ page, limit, userId }),
});

export const fetchFeed = slice.asyncAction;
export const { addPhotos, addPage, resetState: resetFeedState } = slice.actions;

export const loadNewPhotos =
	({ limit = 6, userId }) =>
	async (dispatch, getState) => {
		const { feed } = getState();
		dispatch(addPage());
		const { payload } = await dispatch(
			fetchFeed({ page: feed.pages, limit, userId })
		);
		dispatch(addPhotos(payload));
	};

export default slice.reducer;
