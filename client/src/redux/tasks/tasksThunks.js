import { createAsyncThunk } from "@reduxjs/toolkit";
import { getTasks as getTasksFromLS } from "../../utils/localStorage.js";

// get tasks from local storage
export const getTasks = createAsyncThunk("tasks/getTasks", () => {
  return getTasksFromLS().sort((a, b) =>
    a.dueDate > b.dueDate ? 1 : a.dueDate < b.dueDate ? -1 : 0
  );
});
