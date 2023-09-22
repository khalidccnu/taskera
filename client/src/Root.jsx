import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Nav from "./components/Nav.jsx";

const Root = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/" ? <Nav /> : null}
      <Outlet />
    </>
  );
};

export default Root;
