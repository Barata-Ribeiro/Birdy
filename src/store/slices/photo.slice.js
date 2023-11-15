import { PHOTOS_GET_BY_ID } from "../../constants";
import createAsyncSlice from "../helper/createAsyncSlice";

const slice = createAsyncSlice({
	name: "photo",
	fetchConfig: (photoId) => PHOTOS_GET_BY_ID(photoId),
});

export const fetchPhoto = slice.asyncAction;

export default slice.reducer;
