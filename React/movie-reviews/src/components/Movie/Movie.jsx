import React from "react";
import styles from "./Movie.module.scss";

function Movie({ title, vote_average, vote_count, poster_path }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.poster}>
        <img src={poster_path ? `https://image.tmdb.org/t/p/original${poster_path}` : ""} alt="Poster" />
      </div>
      <div className={styles.votes}>
        <div>Rating: {vote_average}</div>
        <div>Votes: {vote_count}</div>
      </div>
      <div className={styles.title}>{title}</div>
    </div>
  );
}

export default Movie;
