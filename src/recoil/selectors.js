import { selector } from "recoil";
import { Cookies } from "react-cookie";
import jwt from "jsonwebtoken";

import { checkAuth } from "../util/util";
import { refreshState } from "./atoms";

const cookies = new Cookies();

export const loginState = selector({
  key: "loginState",
  get: ({ get }) => {
    let refresh = get(refreshState);
    return checkAuth();
  },
});

export const userInfoState = selector({
  key: "userInfoState",
  get: ({ get }) => {
    const isLogin = get(loginState);
    if (isLogin) {
      try {
        const tokenInfo = cookies.get("webToken").token;
        const { email, username, _id } = jwt.decode(tokenInfo);

        return { email, username, _id };
      } catch (err) {
        console.log(err);
        return null;
      }
    }
    return null;
  },
});
