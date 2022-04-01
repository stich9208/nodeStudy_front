import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router";
import { useRecoilValue } from "recoil";
import { loginState, userInfoState } from "../recoil/selectors";

const VideoUpload = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const isLogin = useRecoilValue(loginState);
  const userInfo = useRecoilValue(userInfoState);
  const navigate = useNavigate();
  const [uploadFeild, setUploadFeild] = useState({});

  const uploadVideo = () => {
    fetch(`${API_URL}/upload`, {
      method: "POST",
      body: JSON.stringify({ uploadFeild, id: userInfo._id }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message !== "success") {
          throw new Error("");
        }
        navigate("/");
      })
      .catch((err) => {
        alert("can not upload file!");
        console.log(err);
      });
  };

  const inputOnChange = (e) => {
    const feild = e.target.name;
    const value = e.target.value;
    setUploadFeild({ ...uploadFeild, [feild]: value });
  };

  return isLogin ? (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label htmlFor="title">
        title
        <input type="text" name="title" onChange={inputOnChange} />
      </label>
      <label htmlFor="description">
        description
        <input type="text" name="description" onChange={inputOnChange} />
      </label>
      <label htmlFor="hashtags">
        hashtags
        <input type="text" name="hashtags" onChange={inputOnChange} />
      </label>
      <button onClick={uploadVideo}>upload</button>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default VideoUpload;
