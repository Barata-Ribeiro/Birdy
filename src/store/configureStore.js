import { combineReducers, configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import feed from "./slices/feed.slice";
import photoPost from "./slices/photoPost.slice";
import token from "./slices/token.slice";
import user from "./slices/user.slice";

const reducer = combineReducers({ photoPost, token, user, feed });
const store = configureStore({
	reducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
