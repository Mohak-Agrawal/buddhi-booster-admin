// userSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    updateUser: (state, action) => {
      const updatedUser = action.payload;
      state.users = state.users.map((user) =>
        user.id === updatedUser.id ? { ...user, ...updatedUser } : user,
      );
    },
    removeUser: (state, action) => {
      const userId = action.payload;
      state.users = state.users.filter((user) => user.id !== userId);
    },
  },
});

export const { setUsers, addUser, updateUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
