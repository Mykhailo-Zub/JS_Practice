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

  const saveGuest = useCallback((guest) => {
    setGuests((prevGuests) => [
      ...prevGuests,
      {
        ...guest,
        isCome: false,
        time: null,
        id: prevGuests.length + 1,
      },
    ]);
  }, []);

  const checkGuest = useCallback((checkedId) => {
    setGuests((prevGuests) => {
      return prevGuests.map((guest) => {
        const { id } = guest;
        if (id === checkedId) {
          return {
            ...guest,
            isCome: true,
            time: new Date().toLocaleTimeString(navigator.language, { hour: "2-digit", minute: "2-digit" }),
          };
        } else return guest;
      });
    });
  }, []);

  return (
    <div className={styles.wrapper}>
      <GuestForm saveGuest={saveGuest} />
      <Table guests={guests} checkGuest={checkGuest}></Table>
    </div>
  );
}

export default App;
