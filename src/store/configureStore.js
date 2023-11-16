import { combineReducers, configureStore } from "@reduxjs/toolkit";
import localForage from "localforage";
import logger from "redux-logger";
import { persistReducer, persistStore } from "redux-persist";
import feed from "./slices/feed.slice";
import photo from "./slices/photo.slice";
import photoPost from "./slices/photoPost.slice";
import token from "./slices/token.slice";
import user from "./slices/user.slice";

const persistConfig = {
	key: "root",
	storage: localForage,
	blacklist: ["feed"],
};

const rootReducer = combineReducers({ photo, photoPost, token, user, feed });
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
