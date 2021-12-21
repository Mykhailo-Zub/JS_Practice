import React from "react";
import { Outlet, useNavigate } from "react-router";
import styles from "./RoutesWrapper.module.css";

function RoutesWrapper({ isMain }) {
  const navigate = useNavigate();
  return (
    <div className={styles.wrapper}>
      <div className={styles.back} onClick={() => navigate(-1)}>
        {"<<"} Back
      </div>
      <Outlet />
    </div>
  );
}

export default RoutesWrapper;
