import React, { Component } from "react";
import styles from "./Form.module.css";

class Form extends Component {
  state = {
    name: "",
    department: "choose",
    isNameOk: false,
    isDepartmentOk: false,
  };

  componentDidUpdate(prevProps) {
    const { name: prevName } = prevProps;
    const { name, department } = this.props;
    if (prevName !== name) {
      this.setState({ name, department, isNameOk: true, isDepartmentOk: true });
    }
  }

  setName = (e) => {
    const newName = e.target.value;
    this.setState({ name: newName });
    if (!/\W|\d|\s+/gm.test(newName) && newName !== "") {
      this.setState({ isNameOk: true });
    } else this.setState({ isNameOk: false });
  };

  setDepartment = (e) => {
    const newDepartment = e.target.value;
    this.setState({ department: newDepartment });
    if (newDepartment !== "choose") {
      this.setState({ isDepartmentOk: true });
    } else this.setState({ isDepartmentOk: false });
  };

  checkAndSaveWorker = () => {
    const { changingId, saveWorker } = this.props;
    const { name, department, isNameOk, isDepartmentOk } = this.state;
    if (isNameOk && isDepartmentOk) {
      if (changingId) {
        saveWorker(changingId, name, department);
      } else {
        saveWorker(null, name, department);
      }
      this.setState({ name: "", department: "choose", isNameOk: false, isDepartmentOk: false });
    } else alert("Please enter correct name and choose department");
  };

  render() {
    const { changingId } = this.props;
    const { name, department, isNameOk, isDepartmentOk } = this.state;

    return (
      <div className={styles.wrapper}>
        <div className={styles.header}>{changingId ? "Change worker info" : "Add new worker"}</div>
        <div className={styles.form}>
          <label htmlFor="name" className={styles.inputWrapper}>
            Enter worker name:{" "}
            <input className={isNameOk ? "" : `${styles.inputError}`} name="name" type="text" value={name} onChange={this.setName} />
            <div className={`${styles.nameErrorText} ${isNameOk ? `${styles.hidden}` : ""}`}>The name must contain only letters</div>
          </label>
          <label htmlFor="department" className={styles.inputWrapper}>
            Choose the department:{" "}
            <select
              className={isDepartmentOk ? "" : `${styles.inputError}`}
              name="department"
              type="text"
              value={department}
              onChange={this.setDepartment}
            >
              <option disabled value="choose">
                Choose your department
              </option>
              <option value="Developers">Developers</option>
              <option value="Management">Management</option>
              <option value="Bookkeeping">Bookkeeping</option>
              <option value="Dining Room">Dining room</option>
            </select>
            <div className={`${styles.departmentErrorText} ${isDepartmentOk ? `${styles.hidden}` : ""}`}>Select the department</div>
          </label>
        </div>
        <div className={styles.button} onClick={this.checkAndSaveWorker}>
          {changingId ? "Change worker info" : "Add new worker"}
        </div>
      </div>
    );
  }
}

export default Form;
