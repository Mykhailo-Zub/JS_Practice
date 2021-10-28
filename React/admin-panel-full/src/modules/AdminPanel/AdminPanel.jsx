import React, { Component } from "react";
import styles from "./AdminPanel.module.css";
import Table from "../../components/Table/Table";
import TableRow from "../../components/TableRow/TableRow";
import Form from "../../components/Form/Form";

class AdminPamel extends Component {
  state = {
    data: false,
    name: "",
    department: "choose",
    curentId: 1,
    isNameOk: true,
    isDepartmentOk: true,
    isChange: false,
    changingId: 0,
    search: "",
  };

  tableData = [];

  componentDidMount() {
    try {
      this.tableData = JSON.parse(localStorage.getItem("myCompanyWorkers"));
      this.setState({ data: true, curentId: this.tableData[this.tableData.length - 1].id + 1 });
    } catch {
      console.error("Something wrong when read local storage!");
    }
  }

  setName = (e) => {
    this.setState({ name: e.target.value });
  };

  setDepartment = (e) => {
    this.setState({ department: e.target.value });
  };

  searchHandler = (e) => {
    this.setState(() => ({
      search: e.target.value,
    }));
  };

  fillFormForChange = (id) => {
    const { name, department } = this.tableData.find((el) => {
      return el.id === parseInt(id) ? el : "";
    });
    this.setState({ name: name, department: department, isChange: true, changingId: id });
  };

  deleteWorker = (id, name) => {
    if (window.confirm(`Do you really want to delete ${name}`)) {
      const newData = this.tableData.filter((el) => {
        return el.id === parseInt(id) ? "" : el;
      });
      this.tableData = newData;
      this.saveToStorage();
    }
  };

  saveWorker = () => {
    let nameOk = false;
    let departmentOk = false;
    const newWorker = {
      name: this.state.name,
      department: this.state.department,
      creationDate: new Date().toLocaleDateString(),
      changeDate: new Date().toLocaleDateString(),
    };
    if (!/\W|\d|\s+/gm.test(this.state.name) && this.state.name !== "") {
      nameOk = true;
      this.setState({ isNameOk: true });
    } else {
      nameOk = false;
      this.setState({ isNameOk: false });
    }

    if (this.state.department !== "choose") {
      departmentOk = true;
      this.setState({ isDepartmentOk: true });
    } else {
      departmentOk = false;
      this.setState({ isDepartmentOk: false });
    }

    if (nameOk && departmentOk) {
      if (this.state.isChange) {
        this.tableData.forEach((el) => {
          // I used forEach because "find" call linter warning: "Array.prototype.find() expects a return value from arrow function"
          if (el.id === this.state.changingId) {
            el.name = this.state.name;
            el.department = this.state.department;
            el.changeDate = new Date().toLocaleDateString();
          }
        });
      } else {
        if (this.tableData !== null && this.tableData.length > 0) {
          newWorker.id = this.state.curentId;
          this.tableData.push(newWorker);
        } else {
          newWorker.id = 1;
          this.tableData = [newWorker];
        }
      }
      this.saveToStorage();
    }
  };

  saveToStorage = () => {
    try {
      localStorage.setItem("myCompanyWorkers", JSON.stringify(this.tableData));
      this.setState((prevState) => ({
        name: "",
        department: "choose",
        curentId: prevState.curentId + 1,
        isNameOk: true,
        isDepartmentOk: true,
        isChange: false,
        search: "",
      }));
    } catch {
      alert("Writing data to local storage failed!");
    }
  };

  render() {
    return (
      <div className={styles.wrapper}>
        <Form data={this.state} setName={this.setName} setDepartment={this.setDepartment} saveWorker={this.saveWorker} />
        <div className={styles.table_name}>Employees of the company "Horns and Hooves"</div>
        <input placeholder="&#128269;" className={styles.search} type="search" value={this.state.search} onChange={this.searchHandler} />
        <Table>
          {this.tableData
            ?.filter(
              (row) =>
                row.name.toLowerCase().includes(this.state.search.toLowerCase()) ||
                row.department.toLowerCase().includes(this.state.search.toLowerCase())
            )
            .map((row, index) => (
              <TableRow
                data={row}
                key={index}
                changeInfo={() => this.fillFormForChange(row.id)}
                deleteWorker={() => this.deleteWorker(row.id, row.name)}
              />
            ))}
        </Table>
      </div>
    );
  }
}

export default AdminPamel;
