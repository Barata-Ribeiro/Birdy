import { combineReducers, configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import feed from "./slices/feed.slice";
import photoPost from "./slices/photoPost.slice";
import token from "./slices/token.slice";
import user from "./slices/user.slice";

const persistConfig = {
	key: "root",
	storage,
	blacklist: ["feed"],
};

const rootReducer = combineReducers({ photoPost, token, user, feed });
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

const persistor = persistStore(store);

export { persistor, store };
