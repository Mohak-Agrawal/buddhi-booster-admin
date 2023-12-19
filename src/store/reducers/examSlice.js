import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  exams: [],
  status: 'idle',
  error: null,
};

const examSlice = createSlice({
  name: 'exams',
  initialState,
  reducers: {
    setExams: (state, action) => {
      state.exams = action.payload;
    },
    addExam: (state, action) => {
      state.exams.push(action.payload);
    },
    updateExam: (state, action) => {
      const { id, updatedExam } = action.payload;
      const existingExam = state.exams.find((exam) => exam.id === id);
      if (existingExam) {
        Object.assign(existingExam, updatedExam);
      }
    },
    removeExam: (state, action) => {
      state.exams = state.exams.filter((exam) => exam.id !== action.payload);
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setExams, addExam, updateExam, removeExam, setStatus, setError } = examSlice.actions;

export const selectExams = (state) => state.exams.exams;
export const selectStatus = (state) => state.exams.status;
export const selectError = (state) => state.exams.error;

export default examSlice.reducer;
