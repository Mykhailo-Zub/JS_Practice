import React from "react";
import styles from "./Widget.module.css";

function Widget({ rating }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>Please rate our application</div>
      <div className={styles.stars}>
        <div className={styles.star} onClick={() => rating(1)}>
          1
        </div>
        <div className={styles.star} onClick={() => rating(2)}>
          2
        </div>
        <div className={styles.star} onClick={() => rating(3)}>
          3
        </div>
        <div className={styles.star} onClick={() => rating(4)}>
          4
        </div>
        <div className={styles.star} onClick={() => rating(5)}>
          5
        </div>
      </div>
    </div>
  );
}

export default Widget;
