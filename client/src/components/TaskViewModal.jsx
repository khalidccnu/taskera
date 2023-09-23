import React from "react";
import { GrStatusGoodSmall } from "react-icons/gr";

const TaskViewModal = ({ task }) => {
  const { title, description, status } = task ?? {};

  return (
    <div className="modal-box max-w-sm">
      {/* modal header */}
      <div className={`flex justify-between items-center`}>
        <p className="flex items-center text-gray-500 space-x-1">
          <GrStatusGoodSmall />
          <span>{status}</span>
        </p>
        {/* close modal */}
        <form method="dialog">
          <button className="btn btn-sm normal-case focus:outline-none">
            Close
          </button>
        </form>
      </div>
      {/* task */}
      <div className={`mt-5 space-y-3`}>
        <h3 className={`font-semibold`}>{title}</h3>
        <p className={`text-gray-500`}>{description}</p>
      </div>
    </div>
  );
};

export default TaskViewModal;
