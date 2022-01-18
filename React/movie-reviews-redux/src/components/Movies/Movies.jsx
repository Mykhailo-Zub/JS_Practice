import React, { useEffect } from "react";
import Movie from "../Movie/Movie";
import styles from "./Movies.module.css";
import { Link } from "react-router-dom";
import { getTrandingToStore } from "../../redux/moviesAction";
import { useDispatch, useSelector } from "react-redux";

function Movies() {
  const dispatch = useDispatch();
  const { movies } = useSelector((state) => state.moviesReducer);

  useEffect(() => {
    dispatch(getTrandingToStore());
  }, [dispatch]);

  return (
    <div className={styles.wrapper}>
      {movies?.map((el) => {
        const { title, vote_average, vote_count, poster_path, id } = el;
        return (
          <Link to={`movie/${id}`} key={id}>
            <Movie title={title} vote_average={vote_average} vote_count={vote_count} poster_path={poster_path} />
          </Link>
        );
      })}
    </div>
  );
}

export default Movies;
