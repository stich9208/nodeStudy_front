import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Cookies } from "react-cookie";

import { getElapsedTime } from "../util/util";

import TitleText from "../a_atom/TitleText";
import SubTitleText from "../a_atom/SubTitleText";

const Home = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/videos`)
      .then((res) => res.json())
      .then((res) => setVideos(res.videos))
      .catch((err) => console.log("fetch error!", err));
  }, []);

  const clickJoin = () => {
    navigate("/join");
  };

  const clickLogin = () => {
    navigate("/login");
  };

  const clickuser = () => {
    navigate("user");
  };

  const clickVideoItem = (id) => {
    navigate(`/video/${id}`);
  };

  const clickLogout = () => {
    cookies.remove("webToken");
    navigate("/login");
  };

  return (
    <HomeContainer>
      <button onClick={clickJoin}>join</button>
      <button onClick={clickLogin}>login</button>
      <button onClick={clickuser}>user</button>
      <button onClick={clickLogout}>logout</button>
      <VideoListContainer>
        {videos.map((video) => {
          return (
            <EachVideo
              key={video._id}
              onClick={() => clickVideoItem(video._id)}
            >
              <div
                style={{
                  width: "100%",
                  height: "200px",
                  backgroundColor: "skyblue",
                  borderRadius: "15px",
                  marginBottom: "7px",
                }}
              ></div>
              <VideoInfo>
                <TitleText>{video.title}</TitleText>
                <SubTitleText>{getElapsedTime(video.createdAt)}</SubTitleText>
              </VideoInfo>
            </EachVideo>
          );
        })}
      </VideoListContainer>
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  height: calc(100vh - 60px);
  padding: 20px;
  background-color: ${(props) => props.theme.color.background};
`;

const VideoListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 1fr;
  gap: 15px;
`;

const EachVideo = styled.div`
  height: 100%;
  cursor: pointer;
`;

const VideoInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

export default Home;
