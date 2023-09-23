import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as yup from "yup";
import DatePicker from "react-datepicker";
import { FaUpload } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setTasks } from "../redux/tasks/tasksSlice.js";
import { getUsers } from "../redux/users/usersThunks.js";

// new task form validation
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

const TaskNewModal = () => {
  const closeModalRef = useRef(null);
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.authSlice);
  const { users } = useSelector((store) => store.usersSlice);
  const [isLoading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      assign: "",
      dueDate: null,
      priority: "",
      documents: null,
    },
    validationSchema,
    onSubmit: async (values, formikHelpers) => {
      setLoading(true);

      const obj = { ...values };
      const formData = new FormData();

      // create form data
      Object.entries(obj).forEach(([key, value]) => {
        if (value instanceof FileList) {
          for (let i = 0; i < value.length; i++) {
            formData.append(key, value[i]);
          }
        } else if (value instanceof Date) {
          formData.append(key, value.toISOString());
        } else if (typeof value === "string") {
          formData.append(key, value);
        }
      });

      // upload documents to server
      delete obj.documents;
      obj.documentsLinks = await axios
        .post(`${import.meta.env.VITE_API_URL}/documents/upload`, formData)
        .then((response) => response.data);

      // create task
      dispatch(setTasks(obj));
      closeModalRef.current.click();
      formikHelpers.resetForm();
      setLoading(false);

      if (user.uid === values.assign) toast.success("Task created!");
      else toast.success("Task assigned!");
    },
  });

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <div className="modal-box max-w-sm">
      {/* modal title */}
      <div className={`flex justify-between items-center`}>
        <div>
          <h3 className="font-bold text-lg">New Task</h3>
          <p className="text-gray-500">It's quick and easy.</p>
        </div>
        {/* close modal */}
        <form method="dialog">
          <button
            className="btn btn-sm normal-case focus:outline-none"
            ref={closeModalRef}
          >
            Close
          </button>
        </form>
      </div>
      {/* new task form */}
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
            <option value="" disabled selected>
              Assign
            </option>
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
            <option value="" disabled selected>
              Priority
            </option>
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
        {/* documents box */}
        <div className="flex flex-col gap-3">
          <label className="relative btn btn-sm rounded w-full normal-case">
            {formik.values.documents ? (
              <span>{formik.values.documents.length + " files"}</span>
            ) : (
              <>
                <span>Choose documents</span>
                <FaUpload />
              </>
            )}
            <input
              type="file"
              multiple
              name="documents"
              className="absolute left-0 top-0 w-0 h-0 overflow-hidden"
              onChange={(e) =>
                formik.setFieldValue("documents", e.currentTarget.files)
              }
            />
          </label>
        </div>
        {/* form submit button */}
        <button
          type="submit"
          className="btn btn-sm w-full bg-axolotl hover:bg-transparent text-white hover:text-axolotl !border-axolotl rounded normal-case"
        >
          <span>Create</span>
          {isLoading ? (
            <span
              className="inline-block h-4 w-4 border-2 border-current border-r-transparent rounded-full animate-spin"
              role="status"
            ></span>
          ) : null}
        </button>
      </form>
    </div>
  );
};

export default TaskNewModal;
