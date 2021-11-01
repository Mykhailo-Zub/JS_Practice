import React from "react";
import styles from "./Table.module.css";
import TableRow from "../TableRow/TableRow";

function Table({ tableData }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        <div className={styles.name}>Name</div>
        <div className={styles.department}>Department</div>
        <div className={styles.created}>Employment date</div>
        <div className={styles.changed}>Change information date</div>
        <div className={styles.action}>Action</div>
      </div>
      <div className={styles.tbody}>
        {tableData.map((row, index) => (
          <TableRow data={row} key={index} changeInfo={() => console.log("Change", row.id)} deleteWorker={() => console.log("Delete", row.id)} />
        ))}
      </div>
    </div>
  );
}

export default Table;
