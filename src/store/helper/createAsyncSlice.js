import { createSlice } from "@reduxjs/toolkit";

/**
 * createAsyncSlice creates a slice with asynchronous actions for data fetching.
 *
 * @param {object} config - The configuration object for creating the slice.
 * @param {string} config.name - The name of the slice.
 * @param {object} config.initialState - The initial state of the slice.
 * @param {object} config.fetchConfig - A function that returns the URL and options for fetching data.
 * @param {object} config.reducers - The reducers for the slice.
 * @param {function} config.reducers.fetchStarted - A reducer for when the fetch process has started.
 * @param {function} config.reducers.fetchSuccess - A reducer for when the fetch process has succeeded.
 * @param {function} config.reducers.fetchError - A reducer for when the fetch process has failed.
 * @param {function} config.reducers.resetState - A reducer for resetting the state of the slice.
 * @param {object} config.asyncActions - The asynchronous actions for the slice.
 * @param {function} config.asyncActions.asyncAction - An asynchronous action for fetching data.
 *
 * @returns {object} The slice with asynchronous actions.
 */
const createAsyncSlice = (config) => {
	const slice = createSlice({
		name: config.name,
		initialState: {
			loading: false,
			data: null,
			error: null,
			...config.initialState,
		},
		reducers: {
			fetchStarted(state) {
				state.loading = true;
			},
			fetchSuccess(state, action) {
				state.loading = false;
				state.data = action.payload;
				state.error = null;
			},
			fetchError(state, action) {
				state.loading = false;
				state.data = null;
				state.error = action.payload;
			},
			resetState(state) {
				state.loading = false;
				state.data = null;
				state.error = null;
			},
			...config.reducers,
		},
	});

	const { fetchStarted, fetchSuccess, fetchError } = slice.actions;

	const asyncAction = (payload) => async (dispatch) => {
		try {
			dispatch(fetchStarted());

			const { url, options } = config.fetchConfig(payload);
			const response = await fetch(url, options);
			const data = await response.json();
			if (response.ok === false) throw new Error(data.message);
			return dispatch(fetchSuccess(data));
		} catch (error) {
			return dispatch(fetchError(error.message));
		}
	};

	return { ...slice, asyncAction };
};

export default createAsyncSlice;
