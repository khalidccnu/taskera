// get tasks
export const getTasks = () => {
  let tasks = [];
  const getTasks = localStorage.getItem("tasks");

  if (getTasks) tasks = JSON.parse(getTasks);

  return tasks;
};

// new or update tasks
export const handleTasks = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};
