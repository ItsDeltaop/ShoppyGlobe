import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: { query: '', category: 'all', sort: 'featured' },
  reducers: {
    setSearchQuery(state, action) { state.query = action.payload; },
    setCategory(state, action) { state.category = action.payload; },
    setSort(state, action) { state.sort = action.payload; },
    clearSearch(state) { state.query = ''; state.category = 'all'; state.sort = 'featured'; },
  },
});

export const { setSearchQuery, setCategory, setSort, clearSearch } = searchSlice.actions;
export const selectSearch = (state) => state.search;
export default searchSlice.reducer;
