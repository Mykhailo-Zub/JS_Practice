import styles from "./App.module.css";
import React, { Component } from "react";
import GuestForm from "./components/GuestForm/GuestForm";
import Table from "./components/Table/Table";

let guests = [
  {
    name: "Vasya",
    age: "30",
    gender: "male",
    isCome: false,
    time: "",
    id: 1,
  },
  {
    name: "Vitya",
    age: "33",
    gender: "male",
    isCome: false,
    time: "",
    id: 2,
  },
];

class App extends Component {
  state = {
    guests,
  };

  saveGuest = (guest) => {
    const { name, age, gender } = guest;
    this.state.guests.push({
      name,
      age,
      gender,
      isCome: false,
      time: "",
      id: this.state.guests.length + 1,
    });
    this.setState({
      guests: this.state.guests,
    });
  };
  checkGuest = (id) => {
    const guestForCheck = this.state.guests.findIndex((guest) => {
      return guest.id === parseInt(id);
    });
    const checkedGuests = this.state.guests.map((guest, index) => {
      if (guestForCheck === index) {
        guest.isCome = true;
        guest.time = new Date().toLocaleTimeString(navigator.language, { hour: "2-digit", minute: "2-digit" });
      }
      return guest;
    });
    this.setState({ guests: checkedGuests });
  };

  render() {
    return (
      <div className={styles.wrapper}>
        <GuestForm saveGuest={this.saveGuest} />
        <Table guests={this.state.guests} checkGuest={this.checkGuest}></Table>
      </div>
    );
  }
}

export default App;
