import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000'; // Replace with your backend API base URL

// Async thunk to fetch all franchises
export const fetchAllFranchises = createAsyncThunk('franchises/fetchAllFranchises', async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/franchises`);
    console.log({ response });
    return response.data;
  } catch (error) {
    throw error;
  }
});

// Async thunk to fetch a franchise by ID
export const fetchFranchiseById = createAsyncThunk(
  'franchises/fetchFranchiseById',
  async (franchiseId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/franchises/${franchiseId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
);

// Async thunk to create a franchise
export const createFranchise = createAsyncThunk(
  'franchises/createFranchise',
  async (franchiseData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/franchises`, franchiseData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
);

// Async thunk to update a franchise by ID
export const updateFranchise = createAsyncThunk(
  'franchises/updateFranchise',
  async ({ franchiseId, franchiseData }) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/franchises/${franchiseId}`, franchiseData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
);

// Async thunk to delete a franchise by ID
export const deleteFranchise = createAsyncThunk(
  'franchises/deleteFranchise',
  async (franchiseId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/franchises/${franchiseId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
);

const franchisesSlice = createSlice({
  name: 'franchises',
  initialState: {
    franchises: [],
    currentFranchise: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Handle the pending state while fetching all franchises
    builder.addCase(fetchAllFranchises.pending, (state) => {
      state.status = 'loading';
    });

    // Handle the fulfilled state after a successful fetch of all franchises
    builder.addCase(fetchAllFranchises.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.franchises = action.payload;
    });

    // Handle the rejected state if there's an error during fetch
    builder.addCase(fetchAllFranchises.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });

    // Other reducers for fetchFranchiseById, createFranchise, updateFranchise, deleteFranchise go here...
  },
});

export default franchisesSlice.reducer;
