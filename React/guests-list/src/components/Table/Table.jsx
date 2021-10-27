import React from "react";
import styles from "./Table.module.css";

function Table(props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        <div className={styles.name}>Name</div>
        <div className={styles.gender}>Gender</div>
        <div className={styles.age}>Age</div>
        <div className={styles.time}>Arrival time</div>
        <div className={styles.action}>The guest came</div>
      </div>
      <div className={styles.tbody}>{props.children}</div>
    </div>
  );
}

export default Table;
