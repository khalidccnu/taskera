import { createSlice } from "@reduxjs/toolkit";
import { getTasks } from "./tasksThunks.js";
import { addToTasks } from "../../utils/localStorage.js";

const initialState = {
  tasks: [],
  tasksError: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      const taskConstruct = {
        id: Math.random().toString(36).substring(2, 7),
        ...action.payload,
        status: "todo",
      };

      state.tasks.push(taskConstruct);
      addToTasks(state.tasks);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.pending, (state) => {
        state.tasks = [];
        state.tasksError = null;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.tasksError = null;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.tasks = [];
        state.tasksError = action?.error.message;
      });
  },
});

export const { setTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
