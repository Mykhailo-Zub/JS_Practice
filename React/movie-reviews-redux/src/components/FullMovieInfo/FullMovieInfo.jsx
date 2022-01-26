import React, { useEffect } from "react";
import { useParams } from "react-router";
import styles from "./FullMovieInfo.module.scss";
import { Link } from "react-router-dom";
import { getMovieInfo } from "../../redux/moviesAction";
import { useDispatch, useSelector } from "react-redux";

function FullMovieInfo() {
  const dispatch = useDispatch();
  const movie = useSelector((state) => state.moviesReducer.movie || {});

  const { id } = useParams();

  useEffect(() => {
    dispatch(getMovieInfo(id));
  }, [id]);

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
  } = movie;

  const connectText = (array) => array?.map((el) => el.name).join(", ");

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
      <div className={styles.info}>
        <div>
          <span>Budget: </span>${budget}
        </div>
        <div>
          <span>Genres: </span>
          {connectText(genres)}
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
          {connectText(production_countries)}
        </div>
        <div>
          <span>Producted by: </span>
          {connectText(production_companies)}
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
    </div>
  );
}

export default FullMovieInfo;
