import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { Cookies } from "react-cookie";
import { loginState, userInfoState } from "../recoil/selectors";

const VideoDetail = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const cookies = new Cookies();
  const params = useParams();
  const navigate = useNavigate();

  const isLogin = useRecoilValue(loginState);
  const userInfo = useRecoilValue(userInfoState);
  const [video, setVideo] = useState("");
  const [editVideo, setEditVideo] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const [commentContent, setCommentContent] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/video/${params.id}`)
      .then((res) => res.json())
      .then((res) => setVideo(res.video))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setEditVideo(video);
    setCommentList(video.comments);
  }, [video]);

  const onChangeFunc = (e) => {
    let { name, value } = e.target;
    if (name === "hashtags") {
      value = value
        .split(",")
        .map((tag) => (tag.startsWith("#") ? tag.trim() : `#${tag.trim()}`));
    }
    setEditVideo({ ...editVideo, [name]: value });
  };

  const onEdit = () => {
    fetch(`${API_URL}/auth`)
      .then((res) => res.json())
      .then((res) => {
        if (res.message === "success") {
          setIsEdit(true);
        }
        if (res.message === "login") {
          alert("login please!");
          return navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  };

  const onSave = () => {
    video === editVideo
      ? setIsEdit(false)
      : fetch(`${API_URL}/video/edit/${params.id}`, {
          method: "PUT",
          body: JSON.stringify(editVideo),
          headers: { "Content-Type": "application/json" },
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.message === "success") {
              alert("edit succcess!");
              setVideo(editVideo);
              setIsEdit(false);
            }
            if (res.message === "login") {
              alert("login please!");
              return navigate("/login");
            }
            throw new Error("edit fail!");
          })
          .catch((err) => console.log(err));
  };

  const onCancel = () => {
    setEditVideo(video);
    setIsEdit(false);
  };

  const onDelete = () => {
    fetch(`${API_URL}/video/${params.id}/delete`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message === "success") {
          alert("deleted success!");
          return navigate("/");
        }
        if (res.message === "login") {
          cookies.remove("webToken");
          alert("login please!");
          return navigate("/login");
        }
        throw new Error("deleted fail!");
      })
      .catch((err) => console.log(err));
  };

  const commentInputOnChange = (e) => {
    const { value } = e.target;
    setCommentContent(value);
  };

  const clickAddCommentBtn = async () => {
    const newCommentList = commentList;
    const newComment = {
      owner: {
        username: userInfo.username,
      },
      text: commentContent,
    };
    newCommentList.unshift(newComment);
    setCommentList(newCommentList);
    console.log(userInfo);

    await fetch(`${API_URL}/video/comment`, {
      method: "POST",
      body: JSON.stringify({
        content: commentContent,
        videoId: video._id,
        userId: userInfo._id,
      }),
      headers: { "Content-Type": "application/json" },
    })
      // .then((res) => res.json())
      .then((res) => console.log(res));
    setCommentContent("");
  };

  return (
    video && (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex" }}>
          <div>title : </div>
          {isEdit ? (
            <input
              type="text"
              name="title"
              value={editVideo.title}
              onChange={onChangeFunc}
            />
          ) : (
            <div>{video.title}</div>
          )}
        </div>
        <div style={{ display: "flex" }}>
          <div>description : </div>
          {isEdit ? (
            <input
              type="text"
              name="description"
              value={editVideo.description}
              onChange={onChangeFunc}
            />
          ) : (
            <div>{video.description}</div>
          )}
        </div>
        <div style={{ display: "flex" }}>
          <div>created at : </div>
          <div>{video.createdAt}</div>
        </div>
        {isEdit ? (
          <input
            type="text"
            name="hashtags"
            value={editVideo.hashtags}
            onChange={onChangeFunc}
          />
        ) : (
          <div>{video.hashtags.map((tag) => tag + " ")}</div>
        )}

        {isLogin && userInfo._id === video.owner ? (
          isEdit ? (
            <>
              <button onClick={onSave}>save</button>
              <button onClick={onCancel}>cancel</button>
            </>
          ) : (
            <>
              <button
                // style={{ display: btnVisible ? "block" : "none" }}
                onClick={onEdit}
              >
                Edit video
              </button>
              <button
                // style={{ display: btnVisible ? "block" : "none" }}
                onClick={onDelete}
              >
                Delete video
              </button>
            </>
          )
        ) : (
          ""
        )}
        {isLogin && commentList ? (
          <>
            <br />
            <h1>Comment</h1>
            <div>
              <textarea
                type="text"
                value={commentContent}
                onChange={commentInputOnChange}
              />
              <button onClick={clickAddCommentBtn}>add comment</button>
            </div>
            <ul>
              {commentList.map((comment, idx) => {
                return (
                  <li key={idx}>
                    {comment.owner.username} : {comment.text}
                  </li>
                );
              })}
            </ul>
          </>
        ) : (
          ""
        )}
      </div>
    )
  );
};

export default VideoDetail;
