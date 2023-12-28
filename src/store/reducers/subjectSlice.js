// subjectSlice.js

import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'; // Assuming you're using Axios

const API_BASE_URL = 'http://localhost:8000';

const initialState = {
  subject: null,
};

export const subjectSlice = createSlice({
  name: 'subject',
  initialState,
  reducers: {
    setSubject: (state, action) => {
      state.subject = action.payload;
    },
  },
});

export const { setSubject } = subjectSlice.actions;

// Async thunk to fetch a subject by ID from the backend
export const fetchSubjectById = (id) => async (dispatch) => {
  try {
    const apiUrl = `${API_BASE_URL}/subjects/${id}`;
    const response = await axios.get(apiUrl); // Adjust the endpoint
    const data = response.data;

    dispatch(setSubject(data));
  } catch (error) {
    console.error(error);
    // Handle errors as needed
  }
};

// Selectors

export default subjectSlice.reducer;
