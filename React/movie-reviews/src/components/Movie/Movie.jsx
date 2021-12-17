import React, { useState, useEffect } from "react";
import { getMovieWithId } from "../../requests";
import { useParams, useNavigate } from "react-router";
import styles from "./Movie.module.scss";
import { Link } from "react-router-dom";

function Movie({ movie }) {
  const [currentMovie, setCurrentMovie] = useState(movie);
  const { id: currentId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!movie) getMovieWithId(currentId).then(setCurrentMovie);
  }, [movie, currentId]);

  const {
    title,
    vote_average,
    vote_count,
    poster_path,
    budget,
    genres,
    production_countries,
    production_companies,
    release_date,
    runtime,
    homepage,
    overview,
  } = currentMovie || {};

  const infoBlock = (
    <div className={styles.info}>
      <div>
        <span>Budget: </span>${budget}
      </div>
      <div>
        <span>Genres: </span>
        {genres?.map((el, i) => (i === 0 ? el.name : ", " + el.name))}
      </div>
      <div>
        <span>Cast: </span>
        <Link to={`cast`}>Click to see cast</Link>
      </div>
      <div>
        <span>Budget: </span>${budget}
      </div>
      <div>
        <span>Countries: </span>
        {production_countries?.map((el, i) => (i === 0 ? el.name : ", " + el.name))}
      </div>
      <div>
        <span>Producted by: </span>
        {production_companies?.map((el, i) => (i === 0 ? el.name : ", " + el.name))}
      </div>
      <div>
        <span>Release date: </span>
        {release_date}
      </div>
      <div>
        <span>Duration: </span>
        {runtime} minutes
      </div>
      <div>
        <span>Homepage: </span>
        <a href={homepage} target="_blank" rel="noreferrer">
          {homepage}
        </a>
      </div>
      <div>
        <span>Reviews: </span>
        <Link to={`reviews`}>Click to see reviews</Link>
      </div>
      <div>{overview}</div>
    </div>
  );

  return (
    <div className={currentId ? styles.fullWrapper : styles.wrapper}>
      {currentId ? (
        <div className={styles.back} onClick={() => navigate(-1)}>
          {"<<"} Back
        </div>
      ) : null}
      <div className={styles.poster}>
        <img src={poster_path ? `https://image.tmdb.org/t/p/original${poster_path}` : ""} alt="Poster" />
      </div>
      <div className={styles.votes}>
        <div>Rating: {vote_average}</div>
        <div>Votes: {vote_count}</div>
      </div>
      <div className={styles.title}>{title}</div>
      {currentId ? infoBlock : null}
    </div>
  );
}

export default Movie;
