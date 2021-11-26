import React, { useState } from "react";
import styles from "./Table.module.css";
import TableRow from "../TableRow/TableRow";

function Table({ tableData, fillFormForChange, deleteWorker }) {
  const [search, setSearch] = useState(null);

  const deleteHandler = (id, name) => {
    if (window.confirm(`Do you really want to delete ${name}`)) {
      deleteWorker(id);
    }
  };

  const validSearch = search || "";
  const searchForFilter = validSearch.toLowerCase();

  return (
    <div className={styles.wrapper}>
      <input placeholder="&#128269;" className={styles.search} type="search" value={validSearch} onChange={(e) => setSearch(e.target.value)} />
      <div className={styles.heading}>
        <div className={styles.name}>Name</div>
        <div className={styles.department}>Department</div>
        <div className={styles.created}>Employment date</div>
        <div className={styles.changed}>Change information date</div>
        <div className={styles.action}>Action</div>
      </div>
      <div className={styles.tbody}>
        {tableData
          ?.filter((row) => {
            const { name, department } = row;
            return name.toLowerCase().includes(searchForFilter) || department.toLowerCase().includes(searchForFilter);
          })
          .map((row, index) => {
            const { name, id } = row;
            return <TableRow data={row} key={index} changeInfo={() => fillFormForChange(id)} deleteWorker={() => deleteHandler(id, name)} />;
          })}
      </div>
    </div>
  );
}

export default Table;
