import React from "react";
import styles from "./TableRow.module.css";

function TableRow({ data, changeInfo, deleteWorker }) {
  const { name, department, creationDate, changeDate } = data;
  return (
    <div className={styles.row}>
      <div className={styles.name}>{name}</div>
      <div className={styles.department}>{department}</div>
      <div className={styles.created}>{creationDate}</div>
      <div className={styles.changed}>{changeDate}</div>
      <div className={styles.btns}>
        <div onClick={changeInfo}>Change worker information</div>
        <div onClick={deleteWorker}>Delete worker</div>
      </div>
    </div>
  );
}

export default TableRow;
