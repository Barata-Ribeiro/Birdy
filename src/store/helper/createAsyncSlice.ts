import {
	Dispatch,
	Draft,
	PayloadAction,
	SliceCaseReducers,
	ValidateSliceCaseReducers,
	createSlice,
} from "@reduxjs/toolkit";

type AsyncState<T> = {
	loading: boolean;
	data: T | null;
	error: string | null;
};

type AsyncReducers<T> = SliceCaseReducers<AsyncState<T>>;

type AsyncSliceConfiguration<T, U extends unknown[]> = {
	name: string;
	initialState: AsyncState<T>;
	reducers: ValidateSliceCaseReducers<AsyncState<T>, AsyncReducers<T>>;
	fetchConfig: (...args: U) => { url: string; options?: RequestInit };
};

/**
 * This function creates an asynchronous slice in the redux store.
 * An asynchronous slice is a slice of the state that handles asynchronous actions,
 * such as fetching data from an API.
 *
 * @param config - The configuration object for the asynchronous slice.
 * This object must include a name, an initialState, reducers, and a fetchConfig property.
 * The name property is the name of the slice, and the initialState property is the initial state of the slice.
 * The reducers property is an object that contains the reducers for the slice.
 * The fetchConfig property is a function that returns an object with a url and options property.
 * The url property is the URL to fetch data from, and the options property is the options object for the fetch call.
 *
 * @returns An object with the slice and asyncAction properties.
 * The slice property is the slice created by createSlice, and the asyncAction property is an asynchronous action that can be dispatched to start the fetch process.
 */
const createAsyncSlice = <T, U extends unknown[]>(
	config: AsyncSliceConfiguration<T, U>
) => {
	const slice = createSlice({
		name: config.name,
		initialState: config.initialState,
		reducers: {
			/**
			 * - fetchStarted: Dispatched when the data fetch process has started. Sets the loading flag to true.
			 *
			 * @param state - The initial state of the slice of the store.
			 */
			fetchStarted(state) {
				state.loading = true;
			},
			/**
       - fetchSuccess: Dispatched when the data fetch process has successfully completed. Sets the loading flag to false.
       
       * @param state - The initial state of the slice of the store.
       * @param action - The action that was dispatched. In this case the payload is the data that was fetched.
       */
			fetchSuccess(state, action: PayloadAction<T>) {
				state.loading = false;
				state.data = action.payload as Draft<T> | null;
				state.error = null;
			},
			/**
			 * - fetchError: Dispatched when the data fetch process has failed. Sets the loading flag to false, sets the data property to null,
			 *   and sets the error property to the payload of the action.
			 *
			 * @param state - The initial state of the slice of the store.
			 * @param action - The action that was dispatched. In this case the payload is the error that occurred.
			 */
			fetchError(state, action: PayloadAction<string>) {
				state.loading = false;
				state.data = null;
				state.error = action.payload;
			},
			/**
			 * - resetState: Dispatched to reset the state of the slice of the store back to its initial state. Sets the loading flag to false,
			 * sets the data property to null, and sets the error property to null.
			 *
			 * @param state - The initial state of the slice of the store.
			 */
			resetState(state) {
				state.loading = false;
				state.data = null;
				state.error = null;
			},
			...config.reducers,
		},
	});

	const { fetchStarted, fetchSuccess, fetchError } = slice.actions;

	const asyncAction =
		(...args: U) =>
		async (dispatch: Dispatch) => {
			try {
				dispatch(fetchStarted());

				const { url, options } = config.fetchConfig(...args);
				const response = await fetch(url, options);
				const data = await response.json();
				if (!response.ok) throw new Error(data.message || "An error occurred");
				return dispatch(fetchSuccess(data));
			} catch (error) {
				if (error instanceof Error) dispatch(fetchError(error.message));
				else dispatch(fetchError(String(error)));
			}
		};

	return { ...slice, asyncAction };
};

export default createAsyncSlice;
