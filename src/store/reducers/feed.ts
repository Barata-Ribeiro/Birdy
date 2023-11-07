import { PayloadAction } from "@reduxjs/toolkit";
import { PHOTOS_GET_ALL } from "../../constants";
import { AppDispatch } from "../configureStore";
import createAsyncSlice from "../helper/createAsyncSlice";

type Photo = {
	id: string;
	authorId: string;
	authorName: string;
	imageUrl: string;
	meta: {
		birdSize: number;
		birdHabitat: string;
		total_comments?: number;
		total_hits?: number;
		total_likes?: number;
	};
	createdAt: Date;
	updatedAt: Date;
};

interface FeedState {
	list: Photo[];
	pages: number;
	infinite: boolean;
}

interface FetchFeedPayload {
	page: number;
	limit: number;
	userId?: string;
}

const feedSlice = createAsyncSlice<
	FeedState,
	FetchFeedPayload,
	Photo[],
	string | null
>({
	name: "feed",
	initialState: {
		list: [],
		pages: 1,
		infinite: true,
	},
	reducers: {
		addPhotos(state, action: PayloadAction<Photo[]>) {
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
	fetchConfig: ({ page, limit, userId }) => PHOTOS_GET_ALL(page, limit, userId),
});

export const fetchFeed = feedSlice.asyncAction;
export const {
	addPhotos,
	addPage,
	resetState: resetFeedState,
} = feedSlice.actions;

export const loadNewPhotos =
	({ limit = 6, userId }: { limit?: number; userId?: string }) =>
	async (dispatch: AppDispatch, getState: () => { feed: FeedState }) => {
		const { feed } = getState();
		dispatch(addPage());
		const { payload } = await dispatch(
			fetchFeed({ page: feed.pages, limit, userId })
		);
		dispatch(addPhotos({ payload }));
	};

export default feedSlice.reducer as typeof feedSlice.reducer;
