import React from "react";
import { useDrag } from "react-dnd";
import { FaEye } from "react-icons/fa";

const Task = ({ setTask, task }) => {
  const { id, title } = task ?? {};

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
      <FaEye
        className={`cursor-pointer`}
        onClick={() => {
          setTask(task);
          window.task_view_modal.showModal();
        }}
      />
    </h5>
  );
};

export default Task;
