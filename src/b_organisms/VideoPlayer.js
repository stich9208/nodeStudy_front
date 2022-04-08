import React from "react";
import styled from "styled-components";

const VideoPlayer = ({ videoInfo }) => {
  return (
    <VideoContainer>
      <video
        controls
        style={{
          border: "3px solid palegoldenrod",
          width: "100%",
          height: "100%",
          borderRadius: "15px",
          marginBottom: "7px",
          backgroundColor: "black",
        }}
      >
        <source src={videoInfo.url} />
      </video>
    </VideoContainer>
  );
};

const VideoContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export default VideoPlayer;
