import React from "react";
import { Outlet, useNavigate } from "react-router";
import { getCast, getOne, getReviews } from "../../redux/moviesAction";
import styles from "./RoutesWrapper.module.css";
import { useDispatch } from "react-redux";

function RoutesWrapper() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const backHandler = () => {
    navigate(-1);
    dispatch(getOne(null));
    dispatch(getCast(null));
    dispatch(getReviews(null));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.back} onClick={backHandler}>
        {"<<"} Back
      </div>
      <Outlet />
    </div>
  );
}

export default RoutesWrapper;
