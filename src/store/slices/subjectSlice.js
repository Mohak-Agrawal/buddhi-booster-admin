import { createSlice } from '@reduxjs/toolkit';
// import { subjectsApi } from '../api/subjectsApi';

// Slice for subjects
const subjectsSlice = createSlice({
  name: 'subjects',
  initialState: {
    subjects: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    setSubjects: (state, action) => {
      state.subjects = action.payload;
    },
    addSubject: (state, action) => {
      state.subjects.push(action.payload);
    },
    updateSubject: (state, action) => {
      const { id, updatedSubject } = action.payload;
      const index = state.subjects.findIndex((subject) => subject.id === id);
      if (index !== -1) {
        state.subjects[index] = updatedSubject;
      }
    },
    deleteSubject: (state, action) => {
      const idToDelete = action.payload;
      state.subjects = state.subjects.filter((subject) => subject.id !== idToDelete);
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(subjectsApi.endpoints.getSubjects.pending, (state) => {
  //       state.isLoading = true;
  //       state.error = null;
  //     })
  //     .addCase(subjectsApi.endpoints.getSubjects.fulfilled, (state, action) => {
  //       state.isLoading = false;
  //       state.subjects = action.payload;
  //     })
  //     .addCase(subjectsApi.endpoints.getSubjects.rejected, (state, action) => {
  //       state.isLoading = false;
  //       state.error = action.error.message;
  //     });
  // },
});

// Export selectors for use in components
export const selectSubjects = (state) => state.subjectsApi.subjects;
export const selectSubjectsLoading = (state) => state.subjectsApi.isLoading;
export const selectSubjectsError = (state) => state.subjectsApi.error;

// Export actions
export const { setSubjects, addSubject, updateSubject, deleteSubject } = subjectsSlice.actions;

// Export the reducer
export default subjectsSlice.reducer;
