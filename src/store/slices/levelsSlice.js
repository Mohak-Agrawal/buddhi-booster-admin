import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  levels: [],
  status: 'idle',
  error: null,
};

const levelSlice = createSlice({
  name: 'levels',
  initialState,
  reducers: {
    setLevels: (state, action) => {
      state.levels = action.payload;
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

export const { setLevels, setStatus, setError } = levelSlice.actions;

export default levelSlice.reducer;
