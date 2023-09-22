import { createSlice } from "@reduxjs/toolkit";
import { getUsers } from "./usersThunks.js";

const initialState = {
  users: [],
  usersError: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.users = [];
        state.usersError = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.usersError = null;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.users = [];
        state.usersError = action?.error.message;
      });
  },
});

export default usersSlice.reducer;
