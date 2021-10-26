import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import dartImg from "./img/Darth_Vader.jpg";
import chewImg from "./img/Chewbacca.jpg";
import c3poImg from "./img/C3PO.jpg";
import jabbaImg from "./img/Jabba_the_Hutt.jpg";
import yodaImg from "./img/Yoda.jpg";
import Contact from "./components/Contact/Contact";

const users = [
  {
    avatar: dartImg,
    name: "Dad",
    lastMessage: "You are really my father?",
    isAuthor: true,
    isRead: false,
    isOnline: true,
    time: "16:33",
  },
  {
    avatar: chewImg,
    name: "Chewbacca",
    lastMessage: "Uuuuugauuuuuurauuu uauduuuuu",
    isAuthor: false,
    isRead: false,
    isOnline: true,
    time: "15:40",
  },
  {
    avatar: c3poImg,
    name: "C3PO",
    lastMessage: "Don't worry, R2 is at home, washing my carasdasdasdasdasdasdasdasd.",
    isAuthor: true,
    isRead: true,
    isOnline: false,
    time: "09:18",
  },
  {
    avatar: yodaImg,
    name: "Trainer",
    lastMessage: "May the Force be with you",
    isAuthor: true,
    isRead: true,
    isOnline: true,
    time: "Mon",
  },
  {
    avatar: jabbaImg,
    name: "Jabba",
    lastMessage: "OK, I'll eat less fatty and fried",
    isAuthor: false,
    isRead: false,
    isOnline: false,
    time: "Okt 20",
  },
];

function App() {
  return (
    <div className="main__wrapper">
      <Header title="Telegram" />
      {users.map((user, index) => {
        const { avatar, name, lastMessage, isOnline, isRead, time, isAuthor } = user;
        return (
          <Contact
            key={index}
            avatar={avatar}
            name={name}
            lastMessage={lastMessage}
            isOnline={isOnline}
            isRead={isRead}
            time={time}
            isAuthor={isAuthor}
          />
        );
      })}
    </div>
  );
}

export default App;
