import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [],
  status: 'idle',
  error: null,
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
      state.status = 'succeeded';
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setCategories, setStatus, setError } = categorySlice.actions;

export const selectCategories = (state) => state.categories.categories;
export const selectCategoryStatus = (state) => state.categories.status;
export const selectCategoryError = (state) => state.categories.error;

export default categorySlice.reducer;
