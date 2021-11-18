import styles from "./App.module.css";
import React, { useState } from "react";
import GuestForm from "./components/GuestForm/GuestForm";
import Table from "./components/Table/Table";

let initialGuests = [
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

function App() {
  const [guests, setGuests] = useState(initialGuests);

  const saveGuest = (guest) => {
    const { name, age, gender } = guest;
    const newGuest = {
      name,
      age,
      gender,
      isCome: false,
      time: "",
      id: guests.length + 1,
    };
    setGuests([...guests, newGuest]);
  };
  const checkGuest = (checkedId) => {
    const checkedGuests = guests.map((guest) => {
      const { name, age, gender, id } = guest;
      if (id === checkedId) {
        return {
          name,
          age,
          gender,
          id,
          isCome: true,
          time: new Date().toLocaleTimeString(navigator.language, { hour: "2-digit", minute: "2-digit" }),
        };
      } else return guest;
    });
    setGuests(checkedGuests);
  };

  return (
    <div className={styles.wrapper}>
      <GuestForm saveGuest={saveGuest} />
      <Table guests={guests} checkGuest={checkGuest}></Table>
    </div>
  );
}

export default App;
