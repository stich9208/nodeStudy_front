import { atom } from "recoil";

export const refreshState = atom({
  key: "refreshState",
  default: 0,
});

export const userState = atom({
  key: "userState",
  default: null,
});

export const userVideoState = atom({
  key: "userVideoList",
  default: [],
});
