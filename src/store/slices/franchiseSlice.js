import { createSlice } from '@reduxjs/toolkit';

const franchiseSlice = createSlice({
  name: 'franchises',
  initialState: {
    franchises: [],
    selectedFranchise: null,
  },
  reducers: {
    setFranchises: (state, action) => {
      state.franchises = action.payload;
    },
    setSelectedFranchise: (state, action) => {
      state.selectedFranchise = action.payload;
    },
  },
});

export const { setFranchises, setSelectedFranchise } = franchiseSlice.actions;

export const selectAllFranchises = (state) => state.franchises.franchises;
export const selectSelectedFranchise = (state) => state.franchises.selectedFranchise;

export default franchiseSlice.reducer;
