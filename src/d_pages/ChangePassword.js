import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

//recoil
import { useRecoilValue } from "recoil";
import { userInfoState } from "../recoil/selectors";

const ChangePassword = () => {
  //constant state
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;
  const initialState = {
    beforePassword: "",
    newPassword: "",
    newPasswordConfirm: "",
  };

  //recoil state
  const userInfo = useRecoilValue(userInfoState);

  //component state
  const [password, setPassword] = useState(initialState);
  const [beforePasswordStatus, setBeforePasswordStatus] = useState(true);

  //functions
  const checkValidation = () => {
    const { beforePassword, newPassword, newPasswordConfirm } = password;
    if (beforePassword === "" || !beforePasswordStatus) {
      alert("Please check your previous password");
      return false;
    }
    if (newPassword.length < 5) {
      alert("password should be more than 5 letters");
      return false;
    }
    if (newPassword !== newPasswordConfirm) {
      alert("please check new password confirm");
      return false;
    }
    return true;
  };

  const inputChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setPassword({ ...password, [name]: value });
    },
    [password]
  );

  const originalPasswordCheck = useCallback(() => {
    fetch(`${API_URL}/checkpassword`, {
      method: "POST",
      body: JSON.stringify({ password: password.beforePassword, userInfo }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message === "wrong password") {
          return setBeforePasswordStatus(false);
        }
        if (res.message === "success") {
          return setBeforePasswordStatus(true);
        }
      })
      .catch((err) => console.log(err));
  }, [password.beforePassword]);

  const clickSaveBtn = useCallback(
    (e) => {
      e.preventDefault();
      if (checkValidation()) {
        fetch(`${API_URL}/changepassword`, {
          method: "PUT",
          body: JSON.stringify({ newPassword: password.newPassword, userInfo }),
          headers: { "Content-Type": "application/json" },
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.message !== "success") {
              return alert("change password fail!");
            }
            alert("change password success!");
            setPassword(initialState);
            return navigate("/user");
          })
          .catch((err) => console.log(err));
      }
    },
    [password]
  );

  return (
    <form>
      <div style={{ display: "flex" }}>
        <div>original password : </div>
        <input
          type="password"
          name="beforePassword"
          autoComplete="off"
          onChange={inputChange}
          onBlur={originalPasswordCheck}
        />
        {beforePasswordStatus ? "" : <span>Please check your password</span>}
      </div>
      <div style={{ display: "flex" }}>
        <div>new password : </div>
        <input
          type="password"
          name="newPassword"
          autoComplete="off"
          onChange={inputChange}
        />
      </div>
      <div style={{ display: "flex" }}>
        <div>new password confirm : </div>
        <input
          type="password"
          name="newPasswordConfirm"
          autoComplete="off"
          onChange={inputChange}
        />
      </div>
      <button onClick={clickSaveBtn}>SAVE</button>
    </form>
  );
};

export default ChangePassword;
