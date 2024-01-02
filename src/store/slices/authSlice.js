import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
    user: JSON.parse(localStorage.getItem('user')) || {}, // Parse user data from localStorage
    singleLogin: false,
  },
  reducers: {
    loginUser: (state, action) => {
      const { user } = action.payload;
      state.isAuthenticated = true;
      state.user = user; // Set user data
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify(user)); // Store user data in localStorage
    },
    logout: (state) => {
      state.isAuthenticated = false;

      state.user = {}; // Clear user data on logout
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('user'); // Remove user data from localStorage
    },
    singleLogin: (state, action) => {
      state.singleLogin = action.payload;
    },
  },
});

export const { loginUser, logout, singleLogin } = authSlice.actions;

export default authSlice.reducer;
