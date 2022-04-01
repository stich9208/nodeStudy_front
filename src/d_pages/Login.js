import React, { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";

//recoil
import { refreshState } from "../recoil/atoms";
import { loginState } from "../recoil/selectors";

//components
import Input from "../a_atom/Input";
import Button from "../a_atom/Button";

const Login = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [refresh, setRefresh] = useRecoilState(refreshState);
  const isLogin = useRecoilValue(loginState);
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });

  useEffect(() => {
    if (isLogin) {
      navigate("/");
    }
  }, [isLogin, navigate]);

  const inputChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const loginBtnClick = (e) => {
    e.preventDefault();
    fetch(`${API_URL}/login`, {
      method: "POST",
      body: JSON.stringify(loginInfo),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.message !== "success") {
          throw new Error(res.message);
        }
        setRefresh(refresh + 1);
        alert("login success!");
      })
      .catch((err) => alert(err.message));
  };

  return isLogin ? (
    <Navigate to="/" />
  ) : (
    <LoginContainer>
      <LoginForm method="post">
        <Input
          type="email"
          name="email"
          placeholder="email"
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
        <Button title="LOGIN" size="medium" onClick={loginBtnClick} />
      </LoginForm>
      <Link to="/join">
        <LinkText>JOIN US!</LinkText>
      </Link>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${(props) => props.theme.color.background};
`;

const LoginForm = styled.form`
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

export default Login;
