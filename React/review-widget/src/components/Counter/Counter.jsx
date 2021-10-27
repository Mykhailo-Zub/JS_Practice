import React from "react";
import styles from "./Counter.module.css";

function Counter({ data }) {
  const { reviews, bad, average, good } = data;
  const percentage = isNaN((good / reviews) * 100) ? 0 : (good / reviews) * 100;
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>Reviews statistic:</div>
      <div>Bad reviews: {bad}</div>
      <div>Average reviews: {average}</div>
      <div>Good reviews: {good}</div>
      <div>Total reviews: {reviews}</div>
      <div>Percentage of good reviews: {percentage.toFixed(0)}%</div>
    </div>
  );
}

export default Counter;
