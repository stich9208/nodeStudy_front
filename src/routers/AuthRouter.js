import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

//recoil
import { useRecoilState, useRecoilValue } from "recoil";
import { refreshState } from "../recoil/atoms";
import { loginState } from "../recoil/selectors";

const AuthRouter = ({ children }) => {
  const [refresh, setRefresh] = useRecoilState(refreshState);
  const isLogin = useRecoilValue(loginState);

  useEffect(() => {
    setRefresh(refresh + 1);
  }, []);

  return <>{!isLogin ? children : <Navigate to="/" />}</>;
};

export default AuthRouter;
