import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { getMovieReviews } from "../../requests";
import Review from "../Review/Review";
import styles from "./Reviews.module.css";

function Reviews() {
  const [reviews, setReviews] = useState(null);
  const { id: currentId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getMovieReviews(currentId).then(setReviews);
  }, [currentId]);

  console.log(reviews);

  return (
    <div className={styles.wrapper}>
      <div className={styles.back} onClick={() => navigate(-1)}>
        {"<<"} Back
      </div>
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
