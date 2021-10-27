import React from "react";
import styles from "./GuestForm.module.css";

function GuestForm({ data, setName, setAge, setGender, saveGuest }) {
  const { name, age, gender, isNameOk } = data;
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>Add new guest</div>
      <div className={styles.form}>
        <label htmlFor="name">
          Guest name: <input name="name" type="text" value={name} onChange={setName} />
          <div className={`${styles.errorText} ${isNameOk ? `${styles.hidden}` : ""}`}>The name must contain only letters</div>
        </label>
        <label htmlFor="gender">
          Guest gender:{" "}
          <select name="gender" type="text" value={gender} onChange={setGender}>
            <option disabled value="not choose">
              Choose gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        <label htmlFor="age">
          Guest age: <input name="age" type="number" value={age} onChange={setAge} />
        </label>
      </div>
      <div className={styles.button} onClick={saveGuest}>
        Save guest
      </div>
    </div>
  );
}

export default GuestForm;
