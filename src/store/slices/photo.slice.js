import {
	ADMIN_DELETE_PHOTO_BY_ID,
	PHOTOS_GET_BY_ID,
	PHOTO_DELETE,
} from "../../constants";
import createAsyncSlice from "../helper/createAsyncSlice";

const slice = createAsyncSlice({
	name: "photo",
	fetchConfig: (photoId) => PHOTOS_GET_BY_ID(photoId),
});

export const fetchPhoto = slice.asyncAction;

export const userDeletePhoto = (photoId, token) => async (dispatch) => {
	const { url, options } = PHOTO_DELETE(photoId, token);

	try {
		const response = await fetch(url, options);
		if (response.ok) {
			const { message } = await response.json();
			dispatch(slice.actions.fetchSuccess(message));
			if ("caches" in window) {
				await caches.keys().then((cacheNames) => {
					cacheNames.forEach((cacheName) => {
						caches.delete(cacheName);
					});
				});
			}
		} else throw new Error(response.statusText);
	} catch (error) {
		dispatch(slice.actions.fetchError(error.message));
	}
};

export const adminDeletePhoto = (photoId, token) => async (dispatch) => {
	const { url, options } = ADMIN_DELETE_PHOTO_BY_ID(photoId, token);

	try {
		const response = await fetch(url, options);
		if (response.ok) {
			const { message } = await response.json();
			dispatch(slice.actions.fetchSuccess(message));
			if ("caches" in window) {
				await caches.keys().then((cacheNames) => {
					cacheNames.forEach((cacheName) => {
						caches.delete(cacheName);
					});
				});
			}
		} else throw new Error(response.statusText);
	} catch (error) {
		dispatch(slice.actions.fetchError(error.message));
	}
};

export default slice.reducer;
