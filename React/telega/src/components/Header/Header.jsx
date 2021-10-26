import React from "react";
import styled from "styled-components";
import menuImg from "../../img/menu.png";
import searchImg from "../../img/search.png";

function Header({ title }) {
  const Wrapper = styled.div`
    width: 100%;
    padding: 5px 10px;
    border-bottom: 2px solid #fff;
    display: flex;
    align-items: center;
    img {
      width: 20px;
      height: 20px;
    }
  `;

  const Title = styled.h3`
    color: #fff;
    margin-right: auto;
    margin-left: 20px;
  `;

  return (
    <Wrapper>
      <img src={menuImg} alt="menu" />
      <Title>{title}</Title>
      <img src={searchImg} alt="menu" />
    </Wrapper>
  );
}

export default Header;
