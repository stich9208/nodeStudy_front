import React from "react";
import styled from "styled-components";

const Input = ({ type, value, name, size, placeholder, onChange, style }) => {
  return (
    <InputContainer
      type={type}
      value={value}
      name={name}
      size={size}
      placeholder={placeholder}
      onChange={onChange}
      style={style}
      autoComplete="off"
    />
  );
};

const InputContainer = styled.input`
  width: ${(props) =>
    props.size === "big"
      ? "400px"
      : props.size === "medium"
      ? "300px"
      : "200px"};
  height: ${(props) =>
    props.size === "big" ? "40px" : props.size === "medium" ? "35px" : "30px"};
  padding-left: 8px;
  font-size: 18px;
  border: 2px solid #809bce;
  border-radius: 10px;
  outline: none;
  box-sizing: border-box;
`;

export default Input;
