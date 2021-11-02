import React, { Component } from "react";
import styles from "./GuestForm.module.css";

class GuestForm extends Component {
  state = {
    name: "",
    age: "",
    gender: "not choose",
    isNameOk: false,
  };

  setName = (e) => {
    const name = e.target.value;
    this.setState({ name });
    if (!/\W|\d|\s+/gm.test(name) && name !== "") {
      this.setState({ isNameOk: true });
    } else this.setState({ isNameOk: false });
  };
  setAge = (e) => {
    const age = e.target.value;
    this.setState({ age });
  };
  setGender = (e) => {
    const gender = e.target.value;
    this.setState({ gender });
  };

  checkNameAndSaveGuest = () => {
    const { name, age, gender, isNameOk } = this.state;
    if (isNameOk) {
      const guest = {
        name,
        age,
        gender,
      };
      this.props.saveGuest(guest);
      this.setState({
        name: "",
        age: "",
        gender: "not choose",
        isNameOk: false,
      });
    } else alert("Enter the correct name");
  };
  render() {
    const {name, gender, age, isNameOk} = this.state
    return (
      <div className={styles.wrapper}>
        <div className={styles.header}>Add new guest</div>
        <div className={styles.form}>
          <label htmlFor="name">
            Guest name: <input name="name" type="text" value={name} onChange={this.setName} />
            <div className={`${styles.errorText} ${isNameOk ? `${styles.hidden}` : ""}`}>The name must contain only letters</div>
          </label>
          <label htmlFor="gender">
            Guest gender:{" "}
            <select name="gender" type="text" value={gender} onChange={this.setGender}>
              <option disabled value="not choose">
                Choose gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>
          <label htmlFor="age">
            Guest age: <input name="age" type="number" value={age} onChange={this.setAge} />
          </label>
        </div>
        <div className={styles.button} onClick={this.checkNameAndSaveGuest}>
          Save guest
        </div>
      </div>
    );
  }
}

export default GuestForm;
