import React, { useState, useEffect } from "react";
import styled from "styled-components";

//util
import { getGeneralDate } from "../util/util";

//components
import TitleText from "../a_atom/TitleText";
import SubTitleText from "../a_atom/SubTitleText";
import VideoPlayer from "./VideoPlayer";
import InfoForm from "./InfoForm";

const VideoForm = ({ page, info, userInfo }) => {
  //constant state
  const API_URL = process.env.REACT_APP_API_URL;
  //component state
  const [generalInfo, setGeneralInfo] = useState({});
  const [commentList, setCommentList] = useState([]);
  const [commentText, setCommentText] = useState("");

  //useEffect
  useEffect(() => {
    if (info !== {}) {
      setCommentList(info.comments);
      setGeneralInfo({
        title: info.title,
        description: info.description,
        owner: info.owner.username,
        created: getGeneralDate(info.createdAt),
        views: info.meta.views,
        liked: info.meta.rating,
      });
    }
  }, [info]);

  //functions
  const commentInputOnChange = (e) => {
    const { value } = e.target;
    setCommentText(value);
  };

  const clickAddCommentBtn = async () => {
    const newCommentList = commentList;
    const newComment = {
      owner: {
        username: userInfo.username,
      },
      text: commentText,
    };
    newCommentList.unshift(newComment);
    setCommentList(newCommentList);

    await fetch(`${API_URL}/video/comment`, {
      method: "POST",
      body: JSON.stringify({
        content: commentText,
        videoId: info._id,
        userId: userInfo._id,
      }),
      headers: { "Content-Type": "application/json" },
    }).then((res) => console.log(res));
    setCommentText("");
  };

  return (
    <FormContainer>
      <VideoContainer>
        <VideoPlayer videoInfo={info} />
      </VideoContainer>
      <InfoContainer>
        <InfoForm
          info={generalInfo}
          isEdit={false}
          inputChange={() => console.log("hah")}
        />
        <TitleText>COMMENTS</TitleText>
        <CommentContainer>
          {commentList.length > 0 ? (
            <CommentSection>
              {commentList.map((comment, idx) => {
                return (
                  <EachComment key={idx}>
                    <EachCommentHeader>
                      <CommentProfile src="/images/profile.png" />
                      {comment.owner.username}
                    </EachCommentHeader>
                    <EachCommentContent> {comment.text}</EachCommentContent>
                    <EachCommentCreatedAt>
                      {getGeneralDate(comment.createdAt)}
                    </EachCommentCreatedAt>
                  </EachComment>
                );
              })}
            </CommentSection>
          ) : (
            <SubTitleText>No Comments</SubTitleText>
          )}

          <AddCommentSection>
            <textarea
              type="text"
              value={commentText}
              onChange={commentInputOnChange}
            />
            <button onClick={clickAddCommentBtn}>add comment</button>
          </AddCommentSection>
        </CommentContainer>
      </InfoContainer>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  gap: 20px;
`;

const VideoContainer = styled.div`
  width: 70%;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  gap: 2%;
`;

const CommentContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const CommentSection = styled.div`
  width: 100%;
  height: 90%;
  overflow-y: auto;
`;

const AddCommentSection = styled.div``;

const EachComment = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const EachCommentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  font-weight: bold;
`;

const CommentProfile = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 10px;
`;

const EachCommentContent = styled.div`
  margin-left: 2%;
  font-size: 15px;
  font-weight: normal;
`;

const EachCommentCreatedAt = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 10px;
  color: rgba(0, 0, 0, 0.5);
`;

export default VideoForm;
