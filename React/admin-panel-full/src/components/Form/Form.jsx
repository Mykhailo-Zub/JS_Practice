import React from "react";
import styles from "./Form.module.css";

function Form({ data, setName, setDepartment, saveWorker }) {
  const { name, department, isNameOk, isDepartmentOk, isChange } = data;
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>{isChange ? "Change worker info" : "Add new worker"}</div>
      <div className={styles.form}>
        <label htmlFor="name" className={styles.inputWrapper}>
          Enter worker name: <input className={isNameOk ? "" : `${styles.inputError}`} name="name" type="text" value={name} onChange={setName} />
          <div className={`${styles.nameErrorText} ${isNameOk ? `${styles.hidden}` : ""}`}>The name must contain only letters</div>
        </label>
        <label htmlFor="department" className={styles.inputWrapper}>
          Choose the department:{" "}
          <select className={isDepartmentOk ? "" : `${styles.inputError}`} name="department" type="text" value={department} onChange={setDepartment}>
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
      <div className={styles.button} onClick={saveWorker}>
        {isChange ? "Change worker info" : "Add new worker"}
      </div>
    </div>
  );
}

export default Form;
