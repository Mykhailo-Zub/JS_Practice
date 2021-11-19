import React, { useState } from "react";
import styles from "./GuestForm.module.css";

function GuestForm({ saveGuest }) {
  const [name, setName] = useState(null);
  const [age, setAge] = useState(null);
  const [gender, setGender] = useState("not choose");
  const [isNameOk, setIsNameOk] = useState(true);

  const changeName = (e) => {
    const name = e.target.value;
    setName(name);
    if (!/\W|\d|\s+/gm.test(name) && name) {
      setIsNameOk(true);
    } else setIsNameOk(false);
  };
  const changeAge = (e) => {
    const age = e.target.value;
    setAge(age);
  };
  const changeGender = (e) => {
    const gender = e.target.value;
    setGender(gender);
  };

  const checkNameAndSaveGuest = () => {
    if (isNameOk && name) {
      const guest = {
        name,
        age,
        gender,
      };
      setName(null);
      setAge(null);
      setGender("not choose");
      setIsNameOk(true);
      saveGuest(guest);
    } else alert("Enter the correct name");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>Add new guest</div>
      <div className={styles.form}>
        <label htmlFor="name">
          Guest name: <input name="name" type="text" value={name || ""} onChange={changeName} />
          <div className={`${styles.errorText} ${isNameOk ? `${styles.hidden}` : ""}`}>The name must contain only letters</div>
        </label>
        <label htmlFor="gender">
          Guest gender:{" "}
          <select name="gender" type="text" value={gender} onChange={changeGender}>
            <option disabled value="not choose">
              Choose gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        <label htmlFor="age">
          Guest age: <input name="age" type="number" value={age || ""} onChange={changeAge} />
        </label>
      </div>
      <div className={styles.button} onClick={checkNameAndSaveGuest}>
        Save guest
      </div>
    </div>
  );
}

export default GuestForm;
