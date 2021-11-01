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
    this.setState({ name: e.target.value });
    if (!/\W|\d|\s+/gm.test(e.target.value) && e.target.value !== "") {
      this.setState({ isNameOk: true });
    } else this.setState({ isNameOk: false });
  };
  setAge = (e) => {
    this.setState({ age: e.target.value });
  };
  setGender = (e) => {
    this.setState({ gender: e.target.value });
  };

  checkNameAndSaveGuest = () => {
    if (this.state.isNameOk) {
      const guest = {
        name: this.state.name,
        age: this.state.age,
        gender: this.state.gender,
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
    return (
      <div className={styles.wrapper}>
        <div className={styles.header}>Add new guest</div>
        <div className={styles.form}>
          <label htmlFor="name">
            Guest name: <input name="name" type="text" value={this.state.name} onChange={this.setName} />
            <div className={`${styles.errorText} ${this.state.isNameOk ? `${styles.hidden}` : ""}`}>The name must contain only letters</div>
          </label>
          <label htmlFor="gender">
            Guest gender:{" "}
            <select name="gender" type="text" value={this.state.gender} onChange={this.setGender}>
              <option disabled value="not choose">
                Choose gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>
          <label htmlFor="age">
            Guest age: <input name="age" type="number" value={this.state.age} onChange={this.setAge} />
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
