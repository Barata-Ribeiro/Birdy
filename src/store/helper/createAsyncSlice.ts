import {
	PayloadAction,
	SliceCaseReducers,
	ValidateSliceCaseReducers,
	createSlice,
} from "@reduxjs/toolkit";
import { Draft } from "immer";
import { AppDispatch } from "../configureStore";

export interface AsyncState<DataPayload, ErrorPayload> {
	loading?: boolean;
	data?: DataPayload | null;
	error?: ErrorPayload | null;
	[key: string]: unknown;
}

export interface _AsyncState<DataPayload, ErrorPayload> {
	loading: boolean;
	data: DataPayload | null;
	error: ErrorPayload | null;
	[key: string]: unknown;
}

export interface _CreateSliceConfig<State> {
	name: string;
	initialState?: State;
	reducers?: ValidateSliceCaseReducers<State, SliceCaseReducers<State>>;
	fetchConfig: (...args) => { url: string; options: RequestInit };
}

const initialAsyncState = {
	loading: false,
	data: null,
	error: null,
};

const createAsyncSlice = <DataPayload = undefined, ErrorPayload = unknown>(
	config: _CreateSliceConfig<AsyncState<DataPayload, ErrorPayload>>
) => {
	const slice = createSlice({
		name: config.name,
		initialState: {
			...initialAsyncState,
			...config.initialState,
		},
		reducers: {
			fetchStarted(state) {
				state.loading = true;
			},
			fetchSuccess(state, action: PayloadAction<Draft<DataPayload>>) {
				state.loading = false;
				state.data = action.payload;
				state.error = null;
			},
			fetchError(state, action: PayloadAction<Draft<ErrorPayload>>) {
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

	const asyncAction = (payload?: any) => async (dispatch: AppDispatch) => {
		try {
			dispatch(fetchStarted());

			const { url, options } = config.fetchConfig(payload);
			const response = await fetch(url, options);
			const data = await response.json();
			if (!response.ok) throw new Error(data as unknown as string);
			return dispatch(fetchSuccess(data));
		} catch (error) {
			return dispatch(fetchError((error as Error).message));
		}
	};

	return { ...slice, asyncAction };
};

export default createAsyncSlice;
