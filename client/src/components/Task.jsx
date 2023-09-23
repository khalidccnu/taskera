import React from "react";
import { useDrag } from "react-dnd";
import toast from "react-hot-toast";
import { FaEye, FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteTasks } from "../redux/tasks/tasksSlice.js";

const Task = ({ setTask, task }) => {
  const { id, title } = task ?? {};
  const dispatch = useDispatch();

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <h5
      className={`flex justify-between items-center px-3 py-2 font-medium text-white bg-axolotl ${
        isDragging ? "opacity-80" : ""
      } rounded cursor-move space-x-2.5`}
      ref={drag}
    >
      <span>{title}</span>
      <div className={`flex space-x-1`}>
        <FaEye
          className={`cursor-pointer`}
          onClick={() => {
            setTask(task);
            window.task_view_modal.showModal();
          }}
        />
        <FaTrash
          className={`cursor-pointer`}
          onClick={() => {
            dispatch(deleteTasks(id));
            toast.success("Task deleted!");
          }}
        />
      </div>
    </h5>
  );
};

export default Task;
