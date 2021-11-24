import React, { useState } from "react";
import styles from "./Table.module.css";
import TableRow from "../TableRow/TableRow";

function Table({ tableData, fillFormForChange, deleteWorker }) {
  const [search, setSearch] = useState(null);

  const searchHandler = (e) => {
    setSearch(e.target.value);
  };

  const changedTableData = [...tableData];

  return (
    <div className={styles.wrapper}>
      <input placeholder="&#128269;" className={styles.search} type="search" value={search || ""} onChange={searchHandler} />
      <div className={styles.heading}>
        <div className={styles.name}>Name</div>
        <div className={styles.department}>Department</div>
        <div className={styles.created}>Employment date</div>
        <div className={styles.changed}>Change information date</div>
        <div className={styles.action}>Action</div>
      </div>
      <div className={styles.tbody}>
        {changedTableData
          ?.filter((row) => {
            const { name, department } = row;
            return name.toLowerCase().includes((search || "").toLowerCase()) || department.toLowerCase().includes((search || "").toLowerCase());
          })
          .map((row, index) => {
            const { name, id } = row;
            return <TableRow data={row} key={index} changeInfo={() => fillFormForChange(id)} deleteWorker={() => deleteWorker(id, name)} />;
          })}
      </div>
    </div>
  );
}

export default Table;
