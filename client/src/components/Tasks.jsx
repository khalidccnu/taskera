import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDoneTasks,
  getProgressTasks,
  getToDoTasks,
  setMyTasks,
} from "../redux/tasks/tasksSlice.js";
import { getTasks } from "../redux/tasks/tasksThunks.js";
import ToDoTasks from "./ToDoTasks.jsx";
import ProgressTasks from "./ProgressTasks.jsx";
import DoneTasks from "./DoneTasks.jsx";
import TaskViewModal from "./TaskViewModal.jsx";

const Tasks = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.authSlice);
  const { tasks, myTasks } = useSelector((store) => store.tasksSlice);
  const [task, setTask] = useState(null);

  useEffect(() => {
    dispatch(getTasks());
  }, []);

  useEffect(() => {
    if (user) dispatch(setMyTasks({ uid: user.uid }));
  }, [user, tasks]);

  useEffect(() => {
    dispatch(getToDoTasks());
    dispatch(getProgressTasks());
    dispatch(getDoneTasks());
  }, [myTasks]);

  return (
    <>
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`}>
        <ToDoTasks setTask={setTask} />
        <ProgressTasks setTask={setTask} />
        <DoneTasks setTask={setTask} />
      </div>
      {/* task view modal declaration */}
      <dialog id="task_view_modal" className="modal">
        <TaskViewModal task={task} />
      </dialog>
    </>
  );
};

export default Tasks;
