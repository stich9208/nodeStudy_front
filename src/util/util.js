import { Cookies } from "react-cookie";
import jwt from "jsonwebtoken";

export const checkAuth = () => {
  const cookies = new Cookies();
  const tokenInfo = cookies.get("webToken");
  if (!tokenInfo) {
    return false;
  }
  try {
    const currentTs = Math.floor(Date.now() / 1000);
    const expTs = jwt.decode(tokenInfo.token).exp;
    const refreshTs = jwt.decode(tokenInfo.refreshToken).exp;
    if (currentTs > expTs) {
      if (currentTs > refreshTs) {
        return false;
      }
      fetch(`${process.env.REACT_APP_API_URL}/auth`)
        .then((res) => res.json())
        .then((res) => {
          console.log(res.message);
          return true;
        })
        .catch((err) => {
          console.log(err);
          return false;
        });
    }
    return true;
  } catch (err) {
    return false;
  }
};

export const getElapsedTime = (createdTime) => {
  const elapsedSecond = (Date.now() - new Date(createdTime).getTime()) / 1000;
  const elapsedMinute =
    (Date.now() - new Date(createdTime).getTime()) / 1000 / 60;
  const elapsedTime =
    (Date.now() - new Date(createdTime).getTime()) / 1000 / 60 / 60;
  const timeDesc =
    elapsedSecond < 60
      ? `${Math.floor(elapsedSecond)} 초전`
      : elapsedMinute < 60
      ? `${Math.floor(elapsedMinute)} 분전`
      : elapsedTime < 24
      ? `${Math.floor(elapsedTime)} 시간전`
      : `${Math.floor(elapsedTime / 24)} 일전`;
  return timeDesc;
};
