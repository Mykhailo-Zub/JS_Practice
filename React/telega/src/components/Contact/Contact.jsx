import React from "react";
import styled from "styled-components";
import readImg from "../../img/read.png";
import unreadImg from "../../img/Unread.png";

function Contact({ avatar, name, lastMessage, isOnline, isRead, time, isAuthor }) {
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
    background-image: url(${avatar});
    background-position: center;
    background-size: 50px 50px;
    &::after {
      content: "";
      width: 10px;
      height: 10px;
      border: ${isOnline ? "1px solid black;" : "none"};
      border-radius: 50%;
      position: absolute;
      right: 2px;
      bottom: 2px;
      background-color: ${isOnline ? "#0063f7" : "transparent"};
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
    margin-left: ${isAuthor ? "10px" : "auto"};
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

  let ticks;
  if (isAuthor) {
    ticks = isRead ? <img src={readImg} /> : <img src={unreadImg} />;
  } else ticks = "";

  return (
    <ContactWrapper>
      <ImgWrapper />
      <InfoWrapper>
        <InfoRow>
          <Name>{name}</Name>
          {ticks}
          <Time>{time}</Time>
        </InfoRow>
        {isAuthor ? (
          <MessageRow>
            <Author>You: </Author>
            {lastMessage}
          </MessageRow>
        ) : (
          <MessageRow>
            <Author>{name}: </Author>
            {lastMessage}
          </MessageRow>
        )}
      </InfoWrapper>
    </ContactWrapper>
  );
}

export default Contact;
