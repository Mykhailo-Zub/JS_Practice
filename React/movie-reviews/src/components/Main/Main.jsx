import React from "react";
import Movie from "../Movie/Movie";
import styles from "./Main.module.css";
import { Link, Outlet } from "react-router-dom";

function Main({ movies }) {
  return (
    <div className={styles.wrapper}>
      {movies?.map((el) => {
        const { id } = el;
        return (
          <Link to={`movie/${id}`} key={id}>
            <Movie movie={el} />
          </Link>
        );
      })}
      <Outlet />
    </div>
  );
}

export default Main;
