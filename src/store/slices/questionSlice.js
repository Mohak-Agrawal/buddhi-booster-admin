// questionSlice.js

import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Replace 'YOUR_BASE_API_URL' with your actual base API URL
const API_BASE_URL = 'http://localhost:8000';

const initialState = {
  questions: [],
  loading: false,
  error: null,
};

export const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setQuestions, setLoading, setError } = questionSlice.actions;

export const fetchQuestionsByCategory = (categoryId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    // Construct the full API endpoint
    const apiUrl = `${API_BASE_URL}/questions/${categoryId}`;

    const response = await axios.get(apiUrl);
    const data = response.data;
    console.log({ data });

    dispatch(setQuestions(data));
  } catch (error) {
    console.error('Error fetching questions:', error);
    dispatch(setError('Error fetching questions'));
  }
};

export const createQuestion = (questionsData) => async (dispatch) => {
  try {
    const apiUrl = `${API_BASE_URL}/questions`;
    const response = await axios.post(apiUrl, questionsData);
    // You can dispatch additional actions or update state as needed
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

export default questionSlice.reducer;
