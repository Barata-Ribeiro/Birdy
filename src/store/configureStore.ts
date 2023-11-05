import {
	Action,
	ThunkAction,
	combineReducers,
	configureStore,
} from "@reduxjs/toolkit";

const counter = (state = 0, action: { type: string; payload?: number }) => {
	switch (action.type) {
		case "INCREMENT":
			return state + 1;
		case "DECREMENT":
			return state - 1;
		default:
			return state;
	}
};

/**
 * Creates the store with the given reducers and middleware.
 */
const store = configureStore({
	reducer: combineReducers({ counter }),
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
