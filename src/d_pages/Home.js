import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Cookies } from "react-cookie";

//util
import { getElapsedTime } from "../util/util";

//components
import TitleText from "../a_atom/TitleText";
import SubTitleText from "../a_atom/SubTitleText";

const Home = () => {
  //constant state
  const navigate = useNavigate();
  const cookies = new Cookies();
  const API_URL = process.env.REACT_APP_API_URL;

  //component state
  const [videos, setVideos] = useState([]);

  //useEffect
  useEffect(() => {
    fetch(`${API_URL}/videos`)
      .then((res) => res.json())
      .then((res) => setVideos(res.videos))
      .catch((err) => console.log("fetch error!", err));
  }, []);

  //functions
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
              <video
                autoPlay
                muted
                loop
                style={{
                  border: "3px solid palegoldenrod",
                  width: "100%",
                  height: "100%",
                  maxHeight: "260px",
                  borderRadius: "15px",
                  marginBottom: "7px",
                  backgroundColor: "black",
                }}
              >
                <source src={video.url} />
              </video>
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
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const VideoInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  gap: 5px;
`;

export default Home;
