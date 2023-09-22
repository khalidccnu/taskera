import React from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as yup from "yup";
import { FaUpload } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setUserLoading } from "../redux/auth/authSlice.js";
import { createUserWithEP } from "../redux/auth/authThunks.js";

// sign up form validation
const validationSchema = yup.object({
  name: yup
    .string()
    .min(3, "Name should be of minimum 3 characters length")
    .required("Name is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  userPhoto: yup
    .mixed()
    .required("Photo is required")
    .test("photoSize", "Photo size is too large (>2MB)", (value) => {
      if (value instanceof File) {
        return value.size <= 2000000;
      }

      return true;
    }),
});

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isUserLoading } = useSelector((state) => state.authSlice);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      userPhoto: null,
    },
    validationSchema,
    onSubmit: (values) => {
      const formData = new FormData();

      // create form data
      Object.entries(values).forEach(([key, value]) => {
        if (typeof value === "string" || value instanceof Blob)
          formData.append(key, value);
      });

      // create user
      dispatch(createUserWithEP({ formData })).then((response) => {
        if (response?.error) {
          dispatch(setUserLoading(false));

          if (
            response.error.message ===
            "Firebase: Error (auth/email-already-in-use)."
          ) {
            toast.error("Email already in use!");
          } else {
            toast.error("Something went wrong!");
          }
        } else {
          toast.success(
            "Your account has been created successfully! You are being redirected, please wait..."
          );

          setTimeout(() => navigate("/dashboard"), 3000);
        }
      });
    },
  });

  return (
    <div className="modal-box max-w-sm">
      <div className={`flex justify-between items-center`}>
        <div>
          <h3 className="font-bold text-lg">Sign Up</h3>
          <p className="text-gray-500">It's quick and easy.</p>
        </div>
        {/* close modal */}
        <form method="dialog">
          <button className="btn btn-sm normal-case focus:outline-none">
            Close
          </button>
        </form>
      </div>
      {/* sign up form */}
      <form
        onSubmit={formik.handleSubmit}
        className="form-control grid grid-cols-1 gap-4 mt-5"
      >
        {/* name box */}
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Name"
            name="name"
            className="input input-sm input-bordered rounded w-full focus:outline-none"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && Boolean(formik.errors.name) ? (
            <small className="text-red-600">
              {formik.touched.name && formik.errors.name}
            </small>
          ) : null}
        </div>
        {/* email box */}
        <div className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Email"
            name="email"
            className="input input-sm input-bordered rounded w-full focus:outline-none"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && Boolean(formik.errors.email) ? (
            <small className="text-red-600">
              {formik.touched.email && formik.errors.email}
            </small>
          ) : null}
        </div>
        {/* password box */}
        <div className="flex flex-col gap-3">
          <input
            type="password"
            placeholder="New password"
            name="password"
            className="input input-sm input-bordered rounded w-full focus:outline-none"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && Boolean(formik.errors.password) ? (
            <small className="text-red-600">
              {formik.touched.password && formik.errors.password}
            </small>
          ) : null}
        </div>
        {/* profile photo box */}
        <div className="flex flex-col gap-3">
          <label className="relative btn btn-sm rounded w-full normal-case">
            {formik.values.userPhoto ? (
              formik.values.userPhoto.name.substring(
                0,
                formik.values.userPhoto.name.lastIndexOf(".")
              )
            ) : (
              <>
                <span>Choose profile photo</span>
                <FaUpload />
              </>
            )}
            <input
              type="file"
              name="userPhoto"
              className="absolute left-0 top-0 w-0 h-0 overflow-hidden"
              accept="image/*"
              onChange={(e) =>
                formik.setFieldValue("userPhoto", e.currentTarget.files[0])
              }
              onBlur={formik.handleBlur}
            />
          </label>
          {formik.touched.userPhoto && Boolean(formik.errors.userPhoto) ? (
            <small className="text-red-600">
              {formik.touched.userPhoto && formik.errors.userPhoto}
            </small>
          ) : null}
        </div>
        {/* form submit button */}
        <button
          type="submit"
          className="btn btn-sm w-full bg-axolotl hover:bg-transparent text-white hover:text-axolotl !border-axolotl rounded normal-case"
        >
          <span>Sign Up</span>
          {isUserLoading ? (
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

export default SignUp;
