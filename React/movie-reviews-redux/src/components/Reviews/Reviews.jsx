import React, { useEffect } from "react";
import { useParams } from "react-router";
import { getMovieReviews } from "../../redux/moviesAction";
import Review from "../Review/Review";
import styles from "./Reviews.module.css";
import { useDispatch, useSelector } from "react-redux";

function Reviews() {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.moviesReducer.reviews);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getMovieReviews(id));
  }, [id]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.reviews}>
        {reviews?.map((el) => {
          const { author, url, content } = el;
          return <Review author={author} url={url} content={content} key={url} />;
        })}
      </div>
    </div>
  );
}

export default Reviews;
