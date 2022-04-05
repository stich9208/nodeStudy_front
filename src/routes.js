import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import dotenv from "dotenv";
import PrivateRouter from "./routers/PrivateRouter";
import AuthRouter from "./routers/AuthRouter";
import Nav from "./b_organisms/Nav";
import Home from "./d_pages/Home";
import Join from "./d_pages/Join";
import Login from "./d_pages/Login";
import SearchList from "./d_pages/SearchList";
import UserDetail from "./d_pages/UserDetail";
import UserEdit from "./d_pages/UserEdit";
import VideoDetail from "./d_pages/VideoDetail";
import VideoUpload from "./d_pages/VideoUpload";
import ChangePassword from "./d_pages/ChangePassword";
import NotFound from "./d_pages/NotFound";

const RootRouter = () => {
  dotenv.config();

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Nav />}>
          <Route path="/" element={<Home />} />
          <Route path="search" element={<SearchList />} />
          <Route
            path="video/upload"
            element={
              <PrivateRouter>
                <VideoUpload />
              </PrivateRouter>
            }
          />
          <Route path="video/:id" element={<VideoDetail />} />
          <Route
            path="user"
            element={
              <PrivateRouter>
                <UserDetail />
              </PrivateRouter>
            }
          />
          <Route
            path="user/edit"
            element={
              <PrivateRouter>
                <UserEdit />
              </PrivateRouter>
            }
          />
          <Route
            path="user/password"
            element={
              <PrivateRouter>
                <ChangePassword />
              </PrivateRouter>
            }
          />
        </Route>

        <Route
          path="join"
          element={
            <AuthRouter>
              <Join />
            </AuthRouter>
          }
        />
        <Route
          path="login"
          element={
            <AuthRouter>
              <Login />
            </AuthRouter>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RootRouter;
