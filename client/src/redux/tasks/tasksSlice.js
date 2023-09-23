import { createSlice } from "@reduxjs/toolkit";
import { getTasks } from "./tasksThunks.js";
import { handleTasks } from "../../utils/localStorage.js";

const initialState = {
  tasks: [],
  tasksError: null,
  toDoTasks: [],
  progressTasks: [],
  doneTasks: [],
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
      handleTasks(state.tasks);
    },
    updateTasks: (state, action) => {
      const taskIdx = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );

      state.tasks.splice(taskIdx, 1, action.payload);
      handleTasks(state.tasks);
    },
    getToDoTasks: (state) => {
      state.toDoTasks = state.tasks.filter((task) => task.status === "todo");
    },
    getProgressTasks: (state) => {
      state.progressTasks = state.tasks.filter(
        (task) => task.status === "progress"
      );
    },
    getDoneTasks: (state) => {
      state.doneTasks = state.tasks.filter((task) => task.status === "done");
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

export const {
  setTasks,
  updateTasks,
  getToDoTasks,
  getProgressTasks,
  getDoneTasks,
} = tasksSlice.actions;
export default tasksSlice.reducer;
