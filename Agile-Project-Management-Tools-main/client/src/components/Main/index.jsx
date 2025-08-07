import React from "react";
import Dashboard from "./Dashboard";
import styles from "./styles.module.css";

const Main = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location = "/";
  };

  return (
    <div>
      <Dashboard />
    </div>
  );
};

export default Main;
