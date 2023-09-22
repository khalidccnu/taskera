import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as yup from "yup";
import { FaGoogle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setUserLoading } from "../redux/auth/authSlice.js";
import { signInWithEP, signInWithGoogle } from "../redux/auth/authThunks.js";
import SignUp from "../components/SignUp.jsx";

// sign in form validation
const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const SignIn = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isUserLoading } = useSelector((state) => state.authSlice);
  const fromURL = location.state?.fromURL.pathname;

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(signInWithEP({ values })).then((response) => {
        if (response?.error) {
          dispatch(setUserLoading(false));

          if (
            response.error.message ===
            "Firebase: Error (auth/invalid-login-credentials)."
          ) {
            toast.error("Invalid sign in!");
          } else {
            toast.error("Something went wrong!");
          }
        } else {
          navigate("/dashboard");
        }
      });
    },
  });

  const handleSignInWithGoogle = () => {
    dispatch(signInWithGoogle()).then((response) => {
      if (response?.error) {
        dispatch(setUserLoading(false));
        toast.error("Something went wrong!");
      } else {
        navigate("/dashboard");
      }
    });
  };

  useEffect(() => {
    if (fromURL)
      toast.error(
        "Only registered user can access this page. Please, sign in first!"
      );
  }, []);

  return (
    <section>
      <div className="container">
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 gap-7 items-center py-10 sm:py-24`}
        >
          {/* brand identity */}
          <div className={`max-w-sm mx-auto`}>
            {/* brand logo */}
            <figure className={`w-full sm:w-72`}>
              <img src="/lg-taskera.svg" alt="taskera" />
            </figure>
            {/* brand description */}
            <h1
              className={`text-xl font-semibold text-center sm:text-start mt-4`}
            >
              Taskera is a collaborative task management app to help stay
              organized and manage day-to-day.
            </h1>
          </div>
          {/* sign in form */}
          <div className="justify-self-center card w-full sm:max-w-sm bg-white shadow-2xl">
            <div className="card-body">
              <form
                className="form-control gap-y-4"
                onSubmit={formik.handleSubmit}
              >
                {/* email input box */}
                <div className="flex flex-col gap-3">
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    className="input input-sm bg-transparent text-axolotl w-full px-0 border-0 border-b border-b-axolotl rounded-none focus:outline-none"
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
                {/* password input box */}
                <div className="flex flex-col gap-3">
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="input input-sm bg-transparent text-axolotl w-full px-0 border-0 border-b border-b-axolotl rounded-none focus:outline-none"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.password &&
                  Boolean(formik.errors.password) ? (
                    <small className="text-red-600">
                      {formik.touched.password && formik.errors.password}
                    </small>
                  ) : null}
                </div>
                {/* form submit button */}
                <button
                  type="submit"
                  className="btn btn-sm w-full bg-axolotl hover:bg-transparent text-white hover:text-axolotl !border-axolotl rounded normal-case"
                >
                  <span>Sign In</span>
                  {isUserLoading ? (
                    <span
                      className="inline-block h-4 w-4 border-2 border-current border-r-transparent rounded-full animate-spin"
                      role="status"
                    ></span>
                  ) : null}
                </button>
                {/* new user sign up modal invoke */}
                <div className="flex flex-col lg:flex-row lg:justify-center lg:space-x-2">
                  <span>New to Taskera?</span>
                  <span
                    className="text-axolotl hover:text-green-rifle w-fit cursor-pointer transition-colors duration-500"
                    onClick={() => window.signup_modal.showModal()}
                  >
                    Create New Account
                  </span>
                </div>
                <div className="divider">or</div>
                {/* google authentication method */}
                <div
                  className="flex justify-center items-center p-2 border hover:text-axolotl hover:border-axolotl rounded cursor-pointer space-x-2 transition-colors duration-500"
                  onClick={handleSignInWithGoogle}
                >
                  <FaGoogle className="text-xl" />
                  <span>Continue with Google</span>
                </div>
              </form>
            </div>
          </div>
          {/* new user sign-up modal declaration */}
          <dialog id="signup_modal" className="modal">
            <SignUp />
          </dialog>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
