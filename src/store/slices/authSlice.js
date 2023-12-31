import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action to set user data after successful login
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    // Action to handle loading state
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    // Action to handle login error
    setError: (state, action) => {
      state.error = action.payload;
    },
    // Action to clear the auth state
    clearAuthState: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const { setUser, setLoading, setError, clearAuthState } = authSlice.actions;

export default authSlice.reducer;
