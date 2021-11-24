import React, { useEffect, useState } from "react";
import styles from "./Form.module.css";

function Form({ name, department, changingId, saveWorker }) {
  const checkName = (name) => !!(name && !/\W|\d|\s+/gm.test(name));
  const checkDepartment = (department) => department !== "choose";

  const [formName, setFormName] = useState(name || null);
  const [formDepartment, setFormDepartment] = useState(department || "choose");
  const [isNameOk, setIsNameOk] = useState(true);
  const [isDepartmentOk, setIsDepartmentOk] = useState(true);

  useEffect(() => {
    setFormName(name || null);
    setFormDepartment(department || "choose");
  }, [name, department]);

  const setName = (e) => {
    const newName = e.target.value;
    setFormName(newName);
    setIsNameOk(checkName(newName));
  };

  const setDepartment = (e) => {
    const newDepartment = e.target.value;
    setFormDepartment(newDepartment);
    setIsDepartmentOk(checkDepartment(newDepartment));
  };

  const checkAndSaveWorker = () => {
    if (checkName(formName) && checkDepartment(formDepartment)) {
      saveWorker(formName, formDepartment);
    } else {
      setIsNameOk(checkName(formName));
      setIsDepartmentOk(checkDepartment(formDepartment));
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>{changingId ? "Change worker info" : "Add new worker"}</div>
      <div className={styles.form}>
        <label htmlFor="name" className={styles.inputWrapper}>
          Enter worker name:{" "}
          <input className={isNameOk ? "" : `${styles.inputError}`} name="name" type="text" value={formName || ""} onChange={setName} />
          <div className={`${styles.nameErrorText} ${isNameOk ? `${styles.hidden}` : ""}`}>The name must contain only letters</div>
        </label>
        <label htmlFor="department" className={styles.inputWrapper}>
          Choose the department:{" "}
          <select
            className={isDepartmentOk ? "" : `${styles.inputError}`}
            name="department"
            type="text"
            value={formDepartment}
            onChange={setDepartment}
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
      <div className={styles.button} onClick={checkAndSaveWorker}>
        {changingId ? "Change worker info" : "Add new worker"}
      </div>
    </div>
  );
}

export default Form;
