import React from "react";
import styles from "./Table.module.css";

function Table(props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        <div className={styles.name}>Name</div>
        <div className={styles.department}>Department</div>
        <div className={styles.created}>Employment date</div>
        <div className={styles.changed}>Change information date</div>
        <div className={styles.action}>Action</div>
      </div>
      <div className={styles.tbody}>{props.children}</div>
    </div>
  );
}

export default Table;
