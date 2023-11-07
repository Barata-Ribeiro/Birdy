import { combineReducers, configureStore } from "@reduxjs/toolkit";
import feed from "./features/feed";
import photoPost from "./features/photoPost";
import token from "./features/token";
import user from "./features/user";

const reducer = combineReducers({ photoPost, token, user, feed });
const store = configureStore({
	reducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
