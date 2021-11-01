import React from "react";
import styles from "./Table.module.css";
import TableRow from "../TableRow/TableRow";

function Table({ guests, checkGuest }) {
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
        {guests
          .sort((a, b) => {
            if (a.name.toLowerCase() < b.name.toLowerCase()) {
              return 1;
            } else return -1;
          })
          .sort((a, b) => {
            if (a.isCome > b.isCome) {
              return 1;
            } else return -1;
          })
          .map((guest, index) => (
            <TableRow data={guest} key={index} checkGuest={() => checkGuest(guest.id)} />
          ))}
      </div>
    </div>
  );
}

export default Table;
