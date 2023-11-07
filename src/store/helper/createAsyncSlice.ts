/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../configureStore";

interface AsyncSliceState<Data> {
	loading: boolean;
	data: Data | null;
	error: string | null;
}

type StateWithExtraProperties<ExtraProps> = AsyncSliceState<unknown> &
	ExtraProps;

interface AsyncSliceConfig<
	ExtraProps,
	FetchPayload,
	SuccessPayload,
	ErrorPayload extends string | null,
> {
	name: string;
	initialState: ExtraProps;
	reducers: {
		[key: string]: (
			state: StateWithExtraProperties<ExtraProps>,
			action: PayloadAction<any>
		) => void;
	};
	fetchConfig: (payload: FetchPayload) => { url: string; options: RequestInit };
}

export type { AsyncSliceConfig, AsyncSliceState, StateWithExtraProperties };

const createAsyncSlice = <
	ExtraProps,
	FetchPayload = void,
	SuccessPayload = unknown,
	ErrorPayload extends string | null = string | null,
>(
	config: AsyncSliceConfig<
		ExtraProps,
		FetchPayload,
		SuccessPayload,
		ErrorPayload
	>
) => {
	const slice = createSlice({
		name: config.name,
		initialState: {
			...config.initialState,
			loading: false,
			data: null,
			error: null,
		} as StateWithExtraProperties<ExtraProps>,
		reducers: {
			fetchStarted(state) {
				state.loading = true;
			},
			fetchSuccess(state, action: PayloadAction<SuccessPayload>) {
				state.loading = false;
				state.data = action.payload;
				state.error = null;
			},
			fetchError(state, action: PayloadAction<ErrorPayload>) {
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

	const asyncAction =
		(payload: FetchPayload) => async (dispatch: AppDispatch) => {
			try {
				dispatch(fetchStarted());
				const { url, options } = config.fetchConfig(payload);
				const response = await fetch(url, options);
				const data: SuccessPayload = await response.json();
				return dispatch(fetchSuccess(data));
			} catch (error: any) {
				return dispatch(fetchError(error.message));
			}
		};

	return { ...slice, asyncAction };
};

export default createAsyncSlice;
