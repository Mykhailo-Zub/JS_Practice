import React from "react";
import styled from "styled-components";
import readImg from "../../img/read.png";
import unreadImg from "../../img/Unread.png";

const ContactWrapper = styled.div`
  width: 100%;
  padding: 5px 10px;
  margin-top: 10px;
  display: flex;
  align-items: center;
`;

const ImgWrapper = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-image: url(${(props) => props.avatar});
  background-position: center;
  background-size: 50px 50px;
  &::after {
    content: "";
    width: 10px;
    height: 10px;
    border: ${(props) => (props.isOnline ? "1px solid black;" : "none")};
    border-radius: 50%;
    position: absolute;
    right: 2px;
    bottom: 2px;
    background-color: ${(props) => (props.isOnline ? "#0063f7" : "transparent")};
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 20px;
  margin-right: 10px;
  width: 245px;
`;

const InfoRow = styled.div`
  display: flex;
  width: 100%;
  img {
    width: 20px;
    height: 20px;
    margin-left: auto;
  }
`;

const Name = styled.div`
  color: #ffffff;
`;

const Time = styled.div`
  color: #ffffff;
  opacity: 0.5;
  margin-left: ${(props) => (props.isAuthor ? "10px" : "auto")};
  font-size: 12px;
`;

const MessageRow = styled.div`
  color: #ffffff;
  opacity: 0.5;
  font-size: 12px;
  margin-top: 8px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
  white-space: nowrap;
`;

const Author = styled.span`
  opacity: 1;
  font-size: 13px;
`;

function Contact({ userInfo }) {
  const { avatar, name, lastMessage, isOnline, isRead, time, isAuthor } = userInfo;
  let timeToShow;
  const currentDay = Math.floor(new Date().getTime() / 86400000);
  const messageDay = Math.floor(time.getTime() / 86400000);
  if (currentDay === messageDay) {
    timeToShow = time.toLocaleTimeString(navigator.language, { hour: "2-digit", minute: "2-digit" });
  } else if (currentDay - 6 <= messageDay) {
    timeToShow = new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(time);
  } else if (currentDay - 6 >= messageDay) {
    timeToShow = time.toLocaleDateString(navigator.language, { month: "short", day: "numeric" });
  }
  let ticks;
  if (isAuthor) {
    ticks = isRead ? <img src={readImg} alt="read" /> : <img src={unreadImg} alt="unread" />;
  } else ticks = "";

  return (
    <ContactWrapper>
      <ImgWrapper avatar={avatar} isOnline={isOnline} />
      <InfoWrapper>
        <InfoRow>
          <Name>{name}</Name>
          {ticks}
          <Time isAuthor={isAuthor}>{timeToShow}</Time>
        </InfoRow>
        <MessageRow>
          <Author>{isAuthor ? "You: " : name}</Author>
          {lastMessage}
        </MessageRow>
      </InfoWrapper>
    </ContactWrapper>
  );
}

export default Contact;
