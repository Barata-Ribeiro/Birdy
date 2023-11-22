import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
	name: "ui",
	initialState: {
		editModal: false,
		deleteModal: false,
	},
	reducers: {
		openEditModal(state) {
			state.editModal = true;
		},
		closeEditModal(state) {
			state.editModal = false;
		},
		openDeleteModal(state) {
			state.deleteModal = true;
		},
		closeDeleteModal(state) {
			state.deleteModal = false;
		},
	},
});

export const {
	closeDeleteModal,
	closeEditModal,
	openDeleteModal,
	openEditModal,
} = slice.actions;

export default slice.reducer;
