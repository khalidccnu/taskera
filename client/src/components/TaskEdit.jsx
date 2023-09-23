import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as yup from "yup";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { updateTasks } from "../redux/tasks/tasksSlice.js";
import { getUsers } from "../redux/users/usersThunks.js";

// task form validation
const validationSchema = yup.object({
  title: yup
    .string()
    .min(3, "Task title should be of minimum 3 characters length")
    .max(100, "Task title should be of maximum 100 characters length")
    .required("Task title is required"),
  description: yup
    .string()
    .min(15, "Task description should be of minimum 15 characters length")
    .max(150, "Task description should be of maximum 150 characters length")
    .required("Task description is required"),
  assign: yup.string().required("Assign is required"),
  dueDate: yup.date().required("Due date is required"),
  priority: yup.string().required("Priority is required"),
});

const TaskEdit = ({ closeModalRef, task }) => {
  const dispatch = useDispatch();
  const { users } = useSelector((store) => store.usersSlice);
  const { id, title, description, assign, dueDate, priority, status } =
    task ?? {};

  const formik = useFormik({
    initialValues: {
      title,
      description,
      assign,
      dueDate: new Date(dueDate),
      priority,
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(updateTasks({ id, ...values, status }));
      closeModalRef.current.click();
      toast.success("Task updated!");
    },
  });

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    // edit task form
    <form
      onSubmit={formik.handleSubmit}
      className="form-control grid grid-cols-1 gap-4 mt-5"
    >
      {/* title box */}
      <div className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Title"
          name="title"
          className="input input-sm input-bordered rounded w-full focus:outline-none"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.title && Boolean(formik.errors.title) ? (
          <small className="text-red-600">
            {formik.touched.title && formik.errors.title}
          </small>
        ) : null}
      </div>
      {/* description box */}
      <div className="flex flex-col gap-3">
        <textarea
          placeholder="Description"
          name="description"
          className="textarea textarea-sm textarea-bordered rounded w-full resize-none focus:outline-none"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        ></textarea>
        {formik.touched.description && Boolean(formik.errors.description) ? (
          <small className="text-red-600">
            {formik.touched.description && formik.errors.description}
          </small>
        ) : null}
      </div>
      {/* assign box */}
      <div className="flex flex-col gap-3">
        <select
          name="assign"
          className="select select-sm select-bordered rounded w-full focus:outline-none"
          value={formik.values.assign}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          {users.map((user) => (
            <option key={user.uid} value={user.uid}>
              {user.displayName}
            </option>
          ))}
        </select>
        {formik.touched.assign && Boolean(formik.errors.assign) ? (
          <small className="text-red-600">
            {formik.touched.assign && formik.errors.assign}
          </small>
        ) : null}
      </div>
      {/* due date box */}
      <div className="flex flex-col gap-3">
        <DatePicker
          placeholderText="Due date"
          name="dueDate"
          dateFormat="dd/MM/yyyy"
          selected={formik.values.dueDate}
          closeOnScroll={true}
          className="input input-sm input-bordered rounded w-full focus:outline-none"
          onChange={(date) => formik.setFieldValue("dueDate", date)}
          onBlur={formik.handleBlur}
        />
        {formik.touched.dueDate && Boolean(formik.errors.dueDate) ? (
          <small className="text-red-600">
            {formik.touched.dueDate && formik.errors.dueDate}
          </small>
        ) : null}
      </div>
      {/* priority box */}
      <div className="flex flex-col gap-3">
        <select
          name="priority"
          className="select select-sm select-bordered rounded w-full focus:outline-none"
          value={formik.values.priority}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          <option value={1}>Low</option>
          <option value={2}>Medium</option>
          <option value={3}>High</option>
        </select>
        {formik.touched.priority && Boolean(formik.errors.priority) ? (
          <small className="text-red-600">
            {formik.touched.priority && formik.errors.priority}
          </small>
        ) : null}
      </div>
      {/* form submit button */}
      <button
        type="submit"
        className="btn btn-sm w-full bg-axolotl hover:bg-transparent text-white hover:text-axolotl !border-axolotl rounded normal-case"
      >
        Update
      </button>
    </form>
  );
};

export default TaskEdit;
