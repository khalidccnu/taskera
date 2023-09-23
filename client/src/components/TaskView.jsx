import React from "react";

const TaskView = ({ setEdit, task }) => {
  const { title, description } = task ?? {};

  return (
    <div className={`mt-5 space-y-4`}>
      <h3 className={`font-semibold`}>{title}</h3>
      <p className={`text-gray-500`}>{description}</p>
      <button
        className="btn btn-sm bg-axolotl hover:bg-transparent text-white hover:text-axolotl !border-axolotl normal-case"
        onClick={() => setEdit(true)}
      >
        Edit
      </button>
    </div>
  );
};

export default TaskView;
