import React from "react";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { updateTaskStatus } from "../redux/tasks/tasksSlice.js";
import Task from "./Task.jsx";

const ProgressTasks = ({ setTask }) => {
  const dispatch = useDispatch();
  const { progressTasks } = useSelector((store) => store.tasksSlice);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => dispatch(updateTaskStatus({ ...item, status: "progress" })),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      className={`bg-green-rifle rounded ${
        isOver ? "opacity-80" : ""
      } overflow-hidden`}
      ref={drop}
    >
      <h3
        className={`flex justify-between items-center p-3 font-bold text-white bg-axolotl`}
      >
        <span>Progress</span>
        <span
          className={`inline-flex justify-center items-center w-7 h-7 bg-white text-axolotl text-xs rounded-full`}
        >
          {progressTasks.length}
        </span>
      </h3>
      <div className={`min-h-12 p-2 space-y-2`}>
        {progressTasks.length ? (
          progressTasks.map((task) => (
            <Task key={task.id} setTask={setTask} task={task} />
          ))
        ) : (
          <h5 className={`px-3 py-2 font-medium text-white bg-axolotl rounded`}>
            No task
          </h5>
        )}
      </div>
    </div>
  );
};

export default ProgressTasks;
