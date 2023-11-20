import { combineReducers, configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import tokenMiddleware from "./helper/tokenMiddleware";
import commentPost from "./slices/commentPost.slice";
import feed from "./slices/feed.slice";
import photo from "./slices/photo.slice";
import photoPost from "./slices/photoPost.slice";
import profile from "./slices/profile.slice";
import profileStats from "./slices/stats.slice";
import token from "./slices/token.slice";
import user from "./slices/user.slice";

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["user", "token"],
};

const rootReducer = combineReducers({
	profile,
	profileStats,
	photo,
	photoPost,
	commentPost,
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
		}).concat(logger, tokenMiddleware),
});

const persistor = persistStore(store);

export { persistor, store };
