import React from "react";
import styled, { keyframes } from "styled-components";

const Button = ({ title, type, size, onClick, style, children }) => {
  return (
    <ButtonContainer type={type} size={size} onClick={onClick} style={style}>
      {title}
      {children}
    </ButtonContainer>
  );
};

const clickAnimation = keyframes`
  0%{
    transform:scale(1)
  }50%{
    transform:scale(0.95)
  }100%{
    transform:scale(1)
  }
`;

const ButtonContainer = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 160px;
  height: ${(props) =>
    props.size === "big" ? "40px" : props.size === "medium" ? "35px" : "27px"};
  padding: 0px 10px 0px 10px;
  font-weight: bold;
  /* font-size: ${(props) =>
    props.size === "big"
      ? "20px"
      : props.size === "medium"
      ? "15px"
      : "12px"}; */
  font-size: 80%;
  border: ${(props) =>
    props.type === "primary" ? "solid 2px white" : "solid 2px #809bce"};
  border-radius: 10px;
  background-color: ${(props) =>
    props.type === "primary" ? "#809bce" : "white"};
  color: ${(props) => (props.type === "primary" ? "white" : "#809bce")};
  cursor: pointer;
  :active {
    animation: ${clickAnimation} 0.1s linear;
  }
  :hover {
    background-color: #c7cdfc;
    color: white;
    border-color: white;
    transition: all 300ms linear;
  }
`;

export default Button;
