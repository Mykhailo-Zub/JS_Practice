import React, { Component } from "react";
import styles from "./Form.module.css";

const initialState = {
  name: "",
  department: "choose",
  isNameOk: false,
  isDepartmentOk: false,
};

class Form extends Component {
  state = initialState;

  componentDidUpdate(prevProps) {
    const { changingId: prevId } = prevProps;
    const { name, department, changingId } = this.props;
    if (prevId !== changingId) {
      this.setState({
        name: name || "",
        department: department || "choose",
        isNameOk: this.checkName(name),
        isDepartmentOk: this.checkDepartment(department),
      });
    }
  }

  checkName = (name) => {
    return name ? !/\W|\d|\s+/gm.test(name) && name !== "" : false;
  };

  checkDepartment = (department) => {
    return department ? department !== "choose" : false;
  };

  setName = (e) => {
    const newName = e.target.value;
    this.setState({
      name: newName,
      isNameOk: this.checkName(newName),
    });
  };

  setDepartment = (e) => {
    const newDepartment = e.target.value;
    this.setState({ department: newDepartment, isDepartmentOk: this.checkDepartment(newDepartment) });
  };

  checkAndSaveWorker = () => {
    const { saveWorker } = this.props;
    const { name, department, isNameOk, isDepartmentOk } = this.state;
    if (isNameOk && isDepartmentOk) {
      saveWorker(name, department);
      this.setState(initialState);
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
