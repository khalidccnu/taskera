import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice.js";
import usersSlice from "./users/usersSlice.js";
import tasksSlice from "./tasks/tasksSlice.js";

const store = configureStore({
  reducer: {
    authSlice,
    usersSlice,
    tasksSlice
  },
});

export default store;
