import React, { useState, useEffect } from "react";
import { getTrandingMovies } from "../../requests";
import Movie from "../Movie/Movie";
import styles from "./Movies.module.css";
import { Link } from "react-router-dom";

function Movies() {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    getTrandingMovies().then(setMovies);
  }, []);
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
