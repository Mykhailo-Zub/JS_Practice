import React, { Component } from "react";
import styles from "./App.module.css";
import Table from "./components/Table/Table";

import Form from "./components/Form/Form";

class App extends Component {
  state = {
    tableData: [],
    changingId: null,
  };

  componentDidMount() {
    try {
      const tableData = JSON.parse(localStorage.getItem("myCompanyWorkers"));
      if (tableData) this.setState({ tableData });
    } catch {
      console.error("Something wrong when read local storage!");
    }
  }

  fillFormForChange = (id) => {
    this.setState({ changingId: id });
  };

  deleteWorker = (id, name) => {
    const { tableData } = this.state;
    if (window.confirm(`Do you really want to delete ${name}`)) {
      const newData = tableData.filter((el) => el.id !== parseInt(id));
      this.setState({ tableData: newData });
      this.saveToStorage(newData);
    }
  };

  saveWorker = (incomeName, incomeDepartment) => {
    const { tableData, changingId } = this.state;
    let newTableData;
    if (changingId) {
      newTableData = tableData.map((el) => {
        const { id, creationDate } = el;
        if (id === changingId) {
          return {
            name: incomeName,
            department: incomeDepartment,
            changeDate: new Date().toLocaleDateString(),
            id,
            creationDate,
          };
        }
        return el;
      });
    } else {
      const newWorker = {
        name: incomeName,
        department: incomeDepartment,
        creationDate: new Date().toLocaleDateString(),
        changeDate: new Date().toLocaleDateString(),
        id: tableData.length > 0 ? tableData[tableData.length - 1].id + 1 : 1,
      };

      newTableData = [...tableData, newWorker];
    }
    this.saveToStorage(newTableData);
  };

  saveToStorage = (data) => {
    try {
      localStorage.setItem("myCompanyWorkers", JSON.stringify(data));
      this.setState({
        tableData: data,
        changingId: null,
      });
    } catch {
      alert("Writing data to local storage failed!");
    }
  };

  render() {
    const { tableData, changingId } = this.state;
    let changingData = {};
    if (changingId) {
      changingData = tableData.find((el) => el.id === changingId);
    }
    const { name, department } = changingData;
    return (
      <div className={styles.wrapper}>
        <Form name={name} department={department} changingId={changingId} saveWorker={this.saveWorker} />
        <div className={styles.table_name}>Employees of the company "Horns and Hooves"</div>
        <Table tableData={tableData} fillFormForChange={this.fillFormForChange} deleteWorker={this.deleteWorker} />
      </div>
    );
  }
}

export default App;
