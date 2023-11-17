import { combineReducers, configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import feed from "./slices/feed.slice";
import photo from "./slices/photo.slice";
import photoPost from "./slices/photoPost.slice";
import profile from "./slices/profile.slice";
import token from "./slices/token.slice";
import user from "./slices/user.slice";

const persistConfig = {
	key: "root",
	storage,
	blacklist: ["feed", "photo", "profile", "token"],
};

const rootReducer = combineReducers({
	profile,
	photo,
	photoPost,
	token,
	user,
	feed,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}).concat(logger),
});

const persistor = persistStore(store);

export { persistor, store };
