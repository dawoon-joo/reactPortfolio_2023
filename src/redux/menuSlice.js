import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	open: false,
};

export const menuSlice = createSlice({
	name: 'menu',
	initialState,
	reducers: {
		open: (state) => {
			state.open = true;
		},
		close: (state) => {
			state.open = false;
		},
		toggle: (state) => {
			state.open = !state.open;
		},
	},
});

export const { toggle, open, close } = menuSlice.actions;
export default menuSlice.reducer;
