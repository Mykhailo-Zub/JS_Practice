import React from "react";
import styled from "styled-components";
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
    time: new Date(2021, 10, 1, 16, 33),
  },
  {
    avatar: chewImg,
    name: "Chewbacca",
    lastMessage: "Uuuuugauuuuuurauuu uauduuuuu",
    isAuthor: false,
    isRead: false,
    isOnline: true,
    time: new Date(2021, 10, 1, 15, 40),
  },
  {
    avatar: c3poImg,
    name: "C3PO",
    lastMessage: "Don't worry, R2 is at home, washing my carasdasdasdasdasdasdasdasd.",
    isAuthor: true,
    isRead: true,
    isOnline: false,
    time: new Date(2021, 10, 1, 9, 1),
  },
  {
    avatar: yodaImg,
    name: "Trainer",
    lastMessage: "May the Force be with you",
    isAuthor: true,
    isRead: true,
    isOnline: true,
    time: new Date(2021, 9, 28, 20, 55),
  },
  {
    avatar: jabbaImg,
    name: "Jabba",
    lastMessage: "OK, I'll eat less fatty and fried",
    isAuthor: false,
    isRead: false,
    isOnline: false,
    time: new Date(2021, 9, 20, 10, 18),
  },
];

const MainWrapper = styled.div`
  border: 2px solid #fff;
  border-radius: 5px;
  width: 350px;
  height: 650px;
  margin: 30px auto;
  background-color: #000;
`;

function App() {
  return (
    <MainWrapper>
      <Header title="Telegram" />
      {users.map((user, index) => {
        return <Contact key={index} userInfo={user} />;
      })}
    </MainWrapper>
  );
}

export default App;
