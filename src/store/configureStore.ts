import {
	Action,
	ThunkAction,
	combineReducers,
	configureStore,
} from "@reduxjs/toolkit";

import photoPost from "./reducers/photoPost";
import token from "./reducers/token";
import user from "./reducers/user";

/**
 * Creates the store with the given reducers and middleware.
 */
const store = configureStore({
	reducer: combineReducers({ user, token, photoPost }),
	middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

/**
 * A type that represents the dispatch function for the store
 */
export type AppDispatch = typeof store.dispatch;

/**
 * A type that represents the root state of the application
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * A type that represents a thunk action that returns a value of type ReturnType
 */
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;

export default store;
