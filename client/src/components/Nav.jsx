import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IKImage } from "imagekitio-react";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../redux/auth/authThunks.js";
import TaskModal from "./TaskModal.jsx";

const Nav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authSlice);
  const { photoURL } = user ?? {};

  // sign out from authentication
  const handleSignOut = () => {
    dispatch(logOut())
      .then(() => sessionStorage.removeItem("_vu"))
      .then(() => navigate("/"));
  };

  return (
    <nav className={`bg-white`}>
      <div className="container">
        <div className="navbar">
          {/* brand identity */}
          <figure className="flex-1">
            <img src="/lg-taskera.svg" alt="" className={`w-20`} />
          </figure>
          <div className="flex-none gap-2">
            {/* new task */}
            <div className="form-control">
              <button
                type="button"
                className="btn btn-sm bg-axolotl hover:bg-transparent text-white hover:text-axolotl !border-axolotl rounded normal-case"
                onClick={() => window.new_task_modal.showModal()}
              >
                <FaPlus />
                <span>New</span>
              </button>
            </div>
            {/* nav links */}
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <figure className="w-10 h-10 rounded-full overflow-hidden">
                  {photoURL?.includes("https://") ? (
                    <img
                      src={photoURL}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <IKImage
                      path={photoURL}
                      className="w-full h-full object-cover"
                      transformation={[{ q: "40" }]}
                    />
                  )}
                </figure>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      "!bg-transparent transition-colors duration-500 " +
                      (isActive
                        ? "text-axolotl hover:text-green-rifle"
                        : "hover:text-green-rifle")
                    }
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                      "!bg-transparent transition-colors duration-500 " +
                      (isActive
                        ? "text-axolotl hover:text-green-rifle"
                        : "hover:text-green-rifle")
                    }
                  >
                    Profile
                  </NavLink>
                </li>
                <li>
                  <span
                    className={`!bg-transparent hover:text-green-rifle transition-colors duration-500`}
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* new task modal */}
        <dialog id="new_task_modal" className="modal">
          <TaskModal />
        </dialog>
      </div>
    </nav>
  );
};

export default Nav;
