import React from "react";
import styles from "./Review.module.css";

function Review({ author, url, content }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.author}>Author: {author}</div>
      <div className={styles.link}>
        Original post:{" "}
        <a href={url} target="_blank" rel="noreferrer">
          {url}
        </a>
      </div>
      <div className={styles.content}>{content}</div>
    </div>
  );
}

export default Review;
