import React from "react";
import styles from "./TableRow.module.css";

function TableRow({ data, checkGuest }) {
  const { name, gender, age, time, isCome, id } = data;
  return (
    <div className={styles.row}>
      <div className={styles.name}>{name}</div>
      <div className={styles.gender}>{gender}</div>
      <div className={styles.age}>{age}</div>
      <div className={styles.time}>{time}</div>
      <div className={styles.action}>
        <input id={id} type="checkbox" value={isCome} checked={isCome} disabled={isCome} onChange={checkGuest} />
      </div>
    </div>
  );
}

export default TableRow;
