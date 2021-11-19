import React from "react";
import styles from "./Table.module.css";
import TableRow from "../TableRow/TableRow";

function Table({ guests, checkGuest }) {
  const guestsForSort = [...guests];
  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        <div className={styles.name}>Name</div>
        <div className={styles.gender}>Gender</div>
        <div className={styles.age}>Age</div>
        <div className={styles.time}>Arrival time</div>
        <div className={styles.action}>The guest came</div>
      </div>
      <div className={styles.tbody}>
        {guestsForSort
          .sort((a, b) => {
            return (
              (b.isCome < a.isCome) - (a.isCome < b.isCome) ||
              (b.name.toLowerCase() < a.name.toLowerCase()) - (a.name.toLowerCase() < b.name.toLowerCase())
            );
          })
          .map((guest, index) => {
            const { id } = guest;
            return <TableRow data={guest} key={index} checkGuest={() => checkGuest(id)} />;
          })}
      </div>
    </div>
  );
}

export default Table;
