import React from "react";
import styles from "./Widget.module.css";

function Widget({ rating }) {
  const totalStars = [1, 2, 3, 4, 5];
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>Please rate our application</div>
      <div className={styles.stars}>
        {totalStars.map((el, i) => (
          <div key={i} className={styles.star} onClick={() => rating(el)}>
            {el}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Widget;
