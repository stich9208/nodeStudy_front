import React, { useEffect, useRef, useState } from "react";
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
    let formData = new FormData();
    Object.keys(uploadFeild).forEach((key) =>
      formData.append(key, uploadFeild[key])
    );
    formData.append("id", userInfo._id);
    fetch(`${API_URL}/upload`, {
      method: "POST",
      body: formData,
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
    if (feild === "file") {
      setUploadFeild({ ...uploadFeild, file: e.target.files[0] });
    } else {
      setUploadFeild({ ...uploadFeild, [feild]: value });
    }
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
      <label htmlFor="hashtags">
        video file
        <input
          type="file"
          name="file"
          accept="video/*"
          multiple={false}
          onChange={inputOnChange}
        />
      </label>
      <button onClick={uploadVideo}>upload</button>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default VideoUpload;
