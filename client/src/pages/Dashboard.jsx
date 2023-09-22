import React, { useEffect } from "react";
import { FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  getDoneTasks,
  getProgressTasks,
  getToDoTasks,
} from "../redux/tasks/tasksSlice.js";
import { getTasks } from "../redux/tasks/tasksThunks.js";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { tasks, toDoTasks, progressTasks, doneTasks } = useSelector(
    (store) => store.tasksSlice
  );

  useEffect(() => {
    dispatch(getTasks());
  }, []);

  useEffect(() => {
    if (tasks.length) {
      dispatch(getToDoTasks());
      dispatch(getProgressTasks());
      dispatch(getDoneTasks());
    }
  }, [tasks.length]);

  return (
    <section className={`py-16`}>
      <div className="container">
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`}>
          <div className={`bg-green-rifle rounded overflow-hidden`}>
            <h3 className={`p-3 font-bold text-white bg-axolotl`}>To Do</h3>
            <div className={`min-h-12 p-2 space-y-2`}>
              {toDoTasks.length ? (
                toDoTasks.map((task) => (
                  <h5
                    key={task.id}
                    className={`flex justify-between items-center px-3 py-2 font-medium text-white bg-axolotl rounded space-x-2.5`}
                  >
                    <span>{task.title}</span>
                    <FaEye />
                  </h5>
                ))
              ) : (
                <h5
                  className={`px-3 py-2 font-medium text-white bg-axolotl rounded`}
                >
                  No task
                </h5>
              )}
            </div>
          </div>
          <div className={`bg-green-rifle rounded overflow-hidden`}>
            <h3 className={`p-3 font-bold text-white bg-axolotl`}>Progress</h3>
            <div className={`min-h-12 p-2 space-y-2`}>
              {progressTasks.length ? (
                progressTasks.map((task) => (
                  <h5
                    key={task.id}
                    className={`flex justify-between items-center px-3 py-2 font-medium text-white bg-axolotl rounded space-x-2.5`}
                  >
                    <span>{task.title}</span>
                    <FaEye />
                  </h5>
                ))
              ) : (
                <h5
                  className={`px-3 py-2 font-medium text-white bg-axolotl rounded`}
                >
                  No task
                </h5>
              )}
            </div>
          </div>
          <div className={`bg-green-rifle rounded overflow-hidden`}>
            <h3 className={`p-3 font-bold text-white bg-axolotl`}>Done</h3>
            <div className={`min-h-12 p-2 space-y-2`}>
              {doneTasks.length ? (
                doneTasks.map((task) => (
                  <h5
                    key={task.id}
                    className={`flex justify-between items-center px-3 py-2 font-medium text-white bg-axolotl rounded space-x-2.5`}
                  >
                    <span>{task.title}</span>
                    <FaEye />
                  </h5>
                ))
              ) : (
                <h5
                  className={`px-3 py-2 font-medium text-white bg-axolotl rounded`}
                >
                  No task
                </h5>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
