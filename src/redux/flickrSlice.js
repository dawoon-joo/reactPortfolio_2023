import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchFlickr = createAsyncThunk('flickr/requestFlickr', async (opt) => {
	const baseURL = 'https://www.flickr.com/services/rest/?format=json&nojsoncallback=1';
	const key = 'ae5dbef0587895ed38171fcda4afb648';
	const method_interest = 'flickr.interestingness.getList';
	const method_search = 'flickr.photos.search';
	const method_user = 'flickr.people.getPhotos';
	const num = 50;
	let url = '';
	if (opt.type === 'interest') url = `${baseURL}&method=${method_interest}&api_key=${key}&per_page=${num}`;
	if (opt.type === 'search') url = `${baseURL}&method=${method_search}&api_key=${key}&per_page=${num}&tags=${opt.tags}`;
	if (opt.type === 'user') url = `${baseURL}&method=${method_user}&api_key=${key}&per_page=${num}&user_id=${opt.user}`;

	const response = await axios.get(url);
	return response.data.photos.photo;
});

const flickrSlice = createSlice({
	name: 'flickr',
	initialState: {
		data: [],
		isLoading: false,
	},
	extraReducers: {
		[fetchFlickr.pending]: (state) => {
			state.isLoading = true;
		},
		[fetchFlickr.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		},
		[fetchFlickr.rejected]: (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		},
	},
});

export default flickrSlice.reducer;
