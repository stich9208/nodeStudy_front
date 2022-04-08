import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

//recoil
import { useRecoilValue, useRecoilState } from "recoil";
import { refreshState, userVideoState } from "../recoil/atoms";
import { userInfoState } from "../recoil/selectors";

//components
import InfoForm from "../b_organisms/InfoForm";
import Button from "../a_atom/Button";

const UserDetail = () => {
  //constant state
  const navigate = useNavigate();

  //recoil state
  const userInfo = useRecoilValue(userInfoState);
  const [refresh, setRefresh] = useRecoilState(refreshState);
  const [userVideos, setUserVideos] = useRecoilState(userVideoState);

  //component state
  const [userInput, setUserInput] = useState(userInfo);
  const [isEdit, setIsEdit] = useState(false);

  //useEffect
  useEffect(() => {
    const API_URL = process.env.REACT_APP_API_URL;
    fetch(`${API_URL}/videolist/${userInfo._id}`)
      .then((res) => res.json())
      .then((res) => {
        setUserVideos(res.videoList);
      })
      .catch((err) => console.log("get user info error", err));
  }, []);

  //functions
  const inputChange = (e) => {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  };

  const clickSaveBtn = (e) => {
    e.preventDefault();
    if (
      userInput.email === userInfo.email &&
      userInput.username === userInfo.username
    ) {
      return clickCancelBtn(e);
    }
    fetch(`${process.env.REACT_APP_API_URL}/edit`, {
      method: "PUT",
      body: JSON.stringify(userInput),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message === "success") {
          alert("edit success");
          setRefresh(refresh + 1);
          return setIsEdit(false);
        }
      })
      .catch((err) => console.log(err));
  };

  const clickEditBtn = (e) => {
    e.preventDefault();
    setIsEdit(true);
  };

  const clickCancelBtn = (e) => {
    e.preventDefault();
    setUserInput(userInfo);
    setIsEdit(false);
  };

  const clickChangePwd = () => {
    navigate("password");
  };

  const clickVideoItem = (id) => {
    navigate(`/video/${id}`);
  };

  return (
    <UserDetailContainer>
      <UserImage src="/images/profile.png" />
      <UserInfoColumn>
        <InfoForm info={userInput} isEdit={isEdit} inputChange={inputChange} />
        <ButtonColumn>
          {isEdit ? (
            <>
              <Button
                title="Cancle"
                onClick={clickCancelBtn}
                style={{ maxWidth: "100px" }}
              />
              <Button
                title="Save"
                onClick={clickSaveBtn}
                style={{ maxWidth: "100px" }}
              />
            </>
          ) : (
            <Button
              title="Edit"
              onClick={clickEditBtn}
              style={{ maxWidth: "100px" }}
            />
          )}
          <Button
            title="Change Password"
            type="primary"
            onClick={clickChangePwd}
          />
        </ButtonColumn>
      </UserInfoColumn>
      <UserVideoColumn>
        <ul>
          {userVideos.map((video) => {
            return (
              <li key={video._id} onClick={() => clickVideoItem(video._id)}>
                <h3>{video.title}</h3>
                <h5>{new Date(video.createdAt).toUTCString()}</h5>
              </li>
            );
          })}
        </ul>
      </UserVideoColumn>
    </UserDetailContainer>
  );
};

const UserDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const UserImage = styled.img`
  width: 15%;
  height: 15%;
  margin-top: 30px;
  border: 3px solid #809bce;
  border-radius: 50%;
`;

const UserInfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 25%;
  gap: 15px;
  margin-top: 30px;
  margin-bottom: 5%;
`;

const UserVideoColumn = styled.div`
  width: 100%;
`;

const ButtonColumn = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 10%;
  gap: 20px;
`;

export default UserDetail;
