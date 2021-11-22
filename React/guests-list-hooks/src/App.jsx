import styles from "./App.module.css";
import React, { useCallback, useState } from "react";
import GuestForm from "./components/GuestForm/GuestForm";
import Table from "./components/Table/Table";

let initialGuests = [
  {
    name: "Vasya",
    age: "30",
    gender: "male",
    isCome: false,
    time: null,
    id: 1,
  },
  {
    name: "Vitya",
    age: "33",
    gender: "male",
    isCome: false,
    time: null,
    id: 2,
  },
];

function App() {
  const [guests, setGuests] = useState(initialGuests);

  const saveGuest = useCallback(
    (guest) => {
      const newGuest = {
        ...guest,
        isCome: false,
        time: null,
        id: guests.length + 1,
      };
      setGuests((prevGuests) => [...prevGuests, newGuest]);
    },
    [guests.length]
  );

  const checkGuest = useCallback(
    (checkedId) => {
      const checkedGuests = guests.map((guest) => {
        const { id } = guest;
        if (id === checkedId) {
          return {
            ...guest,
            isCome: true,
            time: new Date().toLocaleTimeString(navigator.language, { hour: "2-digit", minute: "2-digit" }),
          };
        } else return guest;
      });
      setGuests(checkedGuests);
    },
    [guests]
  );

  return (
    <div className={styles.wrapper}>
      <GuestForm saveGuest={saveGuest} />
      <Table guests={guests} checkGuest={checkGuest}></Table>
    </div>
  );
}

export default App;
