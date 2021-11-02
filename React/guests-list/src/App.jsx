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
    const { guests } = this.state;
    const { name, age, gender } = guest;
    const newGuest = {
      name,
      age,
      gender,
      isCome: false,
      time: "",
      id: guests.length + 1,
    };
    this.setState({
      guests: [...guests, newGuest],
    });
  };
  checkGuest = (checkedId) => {
    const checkedGuests = this.state.guests.map((guest) => {
      const {name, age, gender, id} = guest
      if (id === checkedId) {
        return {
          name,
          age,
          gender,
          id,
          isCome: true,
          time: new Date().toLocaleTimeString(navigator.language, { hour: "2-digit", minute: "2-digit" }),
        }
      } else return guest;
    });
    this.setState({ guests: checkedGuests });
  };

  render() {
    const { guests } = this.state;
    return (
      <div className={styles.wrapper}>
        <GuestForm saveGuest={this.saveGuest} />
        <Table guests={guests} checkGuest={this.checkGuest}></Table>
      </div>
    );
  }
}

export default App;
