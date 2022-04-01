import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { refreshState } from "../recoil/atoms";
import { loginState } from "../recoil/selectors";

const PrivateRouter = ({ children }) => {
  const [refresh, setRefresh] = useRecoilState(refreshState);
  const isLogin = useRecoilValue(loginState);

  useEffect(() => {
    setRefresh(refresh + 1);
  }, []);

  return <>{isLogin ? children : <Navigate to="/login" />}</>;
};

export default PrivateRouter;
