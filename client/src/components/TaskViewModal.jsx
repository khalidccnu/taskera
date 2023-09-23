import React, { useRef, useState } from "react";
import { GrStatusGoodSmall } from "react-icons/gr";
import TaskView from "./TaskView.jsx";
import TaskEdit from "./TaskEdit.jsx";

const TaskViewModal = ({ task }) => {
  const { priority } = task ?? {};
  const closeModalRef = useRef(null);
  const [isEdit, setEdit] = useState(false);

  return (
    <div className="modal-box max-w-sm">
      {/* modal header */}
      <div
        className={`flex ${
          isEdit ? "justify-end" : "justify-between items-center"
        }`}
      >
        {!isEdit ? (
          <p className="flex text-axolotl space-x-1">
            <GrStatusGoodSmall />
            <span className={`-mt-0.5`}>
              {+priority === 1 ? "Low" : +priority === 2 ? "Moderate" : "High"}
            </span>
          </p>
        ) : null}
        {/* close modal */}
        <form method="dialog">
          <button
            className="btn btn-sm normal-case focus:outline-none"
            onClick={() => setEdit(false)}
            ref={closeModalRef}
          >
            Close
          </button>
        </form>
      </div>
      {/* task */}
      {isEdit ? (
        <TaskEdit closeModalRef={closeModalRef} setEdit={setEdit} task={task} />
      ) : (
        <TaskView setEdit={setEdit} task={task} />
      )}
    </div>
  );
};

export default TaskViewModal;
