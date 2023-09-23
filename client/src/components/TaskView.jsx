import React from "react";
import { FaCalendar } from "react-icons/fa";

const TaskView = ({ setEdit, task }) => {
  const { title, description, dueDate } = task ?? {};

  return (
    <div className={`mt-5 space-y-4`}>
      <h3 className={`font-semibold`}>{title}</h3>
      <p className={`text-gray-500`}>{description}</p>
      <div className={`flex justify-between items-center space-x-2.5`}>
        <button
          className="btn btn-sm bg-axolotl hover:bg-transparent text-white hover:text-axolotl !border-axolotl normal-case"
          onClick={() => setEdit(true)}
        >
          Edit
        </button>
        <div className={`flex text-axolotl space-x-1`}>
          <FaCalendar />
          <span className={`-mt-0.5`}>
            {new Date(dueDate).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TaskView;
