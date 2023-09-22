import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice.js";
import usersSlice from "./users/usersSlice.js";

const store = configureStore({
  reducer: {
    authSlice,
    usersSlice,
  },
});

export default store;
