import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Input from "../a_atom/Input";
import Button from "../a_atom/Button";

const Join = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const [joinInfo, setJoinInfo] = useState({
    email: "",
    username: "",
    password: "",
    password2: "",
  });

  const joinInfoValidation = () => {
    if (joinInfo.email === "") {
      return alert("email is required!");
    }
    if (!joinInfo.email.match(emailRegex)) {
      return alert("please check your email address");
    }
    if (joinInfo.username === "") {
      return alert("username is required!");
    }
    if (joinInfo.password.length < 5) {
      return alert("please set password more than 5 characters");
    }
    if (joinInfo.password !== joinInfo.password2) {
      return alert("password confirm is wrong!");
    }
    return true;
  };

  const inputChange = (e) => {
    const { name, value } = e.target;
    setJoinInfo({ ...joinInfo, [name]: value });
  };

  const joinBtnClick = (e) => {
    e.preventDefault();
    if (joinInfoValidation()) {
      fetch(`${API_URL}/join`, {
        method: "POST",
        body: JSON.stringify(joinInfo),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.message === "success") {
            navigate("/login");
          } else {
            if (res.message === "duplicated") {
              throw new Error(`duplicated ${res.dupKey}!`);
            }
            throw new Error("server error");
          }
        })
        .catch((err) => alert(err.message));
    }
  };

  return (
    <JoinContainer>
      <JoinForm method="POST">
        <Input
          type="email"
          name="email"
          placeholder="email"
          size="medium"
          onChange={inputChange}
          style={{ marginBottom: "20px" }}
        />
        <Input
          type="text"
          name="username"
          placeholder="user name"
          size="medium"
          onChange={inputChange}
          style={{ marginBottom: "20px" }}
        />

        <Input
          type="password"
          name="password"
          placeholder="password"
          size="medium"
          onChange={inputChange}
          style={{ marginBottom: "20px" }}
        />
        <Input
          type="password"
          name="password2"
          placeholder="password confirm"
          size="medium"
          onChange={inputChange}
          style={{ marginBottom: "20px" }}
        />
        <Button title="JOIN" size="medium" onClick={joinBtnClick} />
      </JoinForm>
      <Link to="/login">
        <LinkText>GO TO LOGIN</LinkText>
      </Link>
    </JoinContainer>
  );
};

const JoinContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${(props) => props.theme.color.background};
`;

const JoinForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 50px;
`;

const LinkText = styled.span`
  display: flex;
  margin-top: 20px;
  text-align: center;
  font-weight: bold;
`;

export default Join;
