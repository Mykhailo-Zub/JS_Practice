import React, { Component } from "react";
import GuestForm from "../GuestForm/GuestForm";
import Table from "../Table/Table";
import TableRow from "../TableRow/TableRow";

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

class GuestList extends Component {
  state = {
    guests: guests,
    name: "",
    age: "",
    gender: "not choose",
    curentId: 3,
    isNameOk: true,
  };

  setName = (e) => {
    this.setState({ name: e.target.value });
  };
  setAge = (e) => {
    this.setState({ age: e.target.value });
  };
  setGender = (e) => {
    this.setState({ gender: e.target.value });
  };
  saveGuest = () => {
    if (!/\W|\d|\s+/gm.test(this.state.name) && this.state.name !== "") {
      guests.push({
        name: this.state.name,
        age: this.state.age,
        gender: this.state.gender,
        isCome: false,
        time: "",
        id: this.state.curentId,
      });
      this.setState((prevState) => ({
        guests: guests,
        name: "",
        age: "",
        gender: "choose",
        curentId: prevState.curentId + 1,
        isNameOk: true,
      }));
    } else this.setState({ isNameOk: false });
  };
  checkGuest = (e) => {
    const index = guests.findIndex((guest) => {
      return guest.id === parseInt(e.target.id);
    });
    guests[index].isCome = true;
    guests[index].time = new Date().toLocaleTimeString(navigator.language, { hour: "2-digit", minute: "2-digit" });
    this.setState({ guests: guests });
  };
  render() {
    return (
      <>
        <GuestForm data={this.state} setName={this.setName} setAge={this.setAge} setGender={this.setGender} saveGuest={this.saveGuest} />
        <Table>
          {this.state.guests
            .sort((a, b) => {
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
              } else return -1;
            })
            .filter((el) => !el.isCome)
            .map((guest, index) => (
              <TableRow data={guest} key={index} checkGuest={this.checkGuest} />
            ))}
          {this.state.guests
            .sort((a, b) => {
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
              } else return -1;
            })
            .filter((el) => el.isCome)
            .map((guest, index) => (
              <TableRow data={guest} key={index} checkGuest={this.checkGuest} />
            ))}
        </Table>
      </>
    );
  }
}

export default GuestList;
