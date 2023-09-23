import React from "react";
import Tasks from "../components/Tasks.jsx";

const Dashboard = () => {
  return (
    <section className={`py-16`}>
      <div className="container">
        <Tasks />
      </div>
    </section>
  );
};

export default Dashboard;
