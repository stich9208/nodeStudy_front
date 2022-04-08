import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, Navigate } from "react-router";

//recoil
import { useRecoilValue } from "recoil";
import { loginState, userInfoState } from "../recoil/selectors";

//components
import VideoForm from "../b_organisms/VideoForm";

const VideoUpload = () => {
  //constant state
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  //recoil state
  const isLogin = useRecoilValue(loginState);
  const userInfo = useRecoilValue(userInfoState);

  //component state
  const [uploadFeild, setUploadFeild] = useState({});

  //functions
  const uploadVideo = () => {
    uploadFeild.id = userInfo._id;
    let formData = new FormData();
    Object.keys(uploadFeild).forEach((key) =>
      formData.append(key, uploadFeild[key])
    );
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
    <UploadContainer>
      {/* <VideoForm page="upload"></VideoForm> */}
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
    </UploadContainer>
  ) : (
    <Navigate to="/login" />
  );
};

const UploadContainer = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 60px);
  padding: 20px;
`;

export default VideoUpload;
