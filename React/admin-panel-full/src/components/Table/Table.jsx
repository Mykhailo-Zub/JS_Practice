import React, { Component } from "react";
import styles from "./Table.module.css";
import TableRow from "../TableRow/TableRow";

class Table extends Component {
  state = {
    search: "",
  };

  searchHandler = (e) => {
    this.setState({
      search: e.target.value,
    });
  };

  render() {
    const { tableData, fillFormForChange, deleteWorker } = this.props;
    const { search } = this.state;

    return (
      <div className={styles.wrapper}>
        <input placeholder="&#128269;" className={styles.search} type="search" value={search} onChange={this.searchHandler} />
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
              return name.toLowerCase().includes(search.toLowerCase()) || department.toLowerCase().includes(search.toLowerCase());
            })
            .map((row, index) => {
              const { name, id } = row;
              return <TableRow data={row} key={index} changeInfo={() => fillFormForChange(id)} deleteWorker={() => deleteWorker(id, name)} />;
            })}
        </div>
      </div>
    );
  }
}

export default Table;
