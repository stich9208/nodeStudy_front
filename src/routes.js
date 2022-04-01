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

import AWS from "aws-sdk";
import { PutBucketCorsCommand, S3Client } from "@aws-sdk/client-s3";

const RootRouter = () => {
  dotenv.config();

  // const REGION = "kr-standard";
  // const BUCKET_NAME = "toyproject";
  // const endpoint = new AWS.Endpoint("https://kr.object.ncloudstorage.com");

  // const s3Client = new S3Client({
  //   region: REGION,
  // });

  // AWS.config.update({
  //   region: REGION,
  //   endpoint,
  //   credentials: {
  //     accessKeyId:
  //     secretAccessKey:
  //   },
  // });

  // const S3 = new AWS.S3({ apiVersion: "2006-03-01" });

  // const params = {
  //   Bucket: BUCKET_NAME,

  //   CORSConfiguration: {
  //     CORSRules: [
  //       {
  //         AllowedHeaders: ["*"],
  //         AllowedMethods: ["PUT", "POST"],
  //         AllowedOrigins: ["*"],
  //       },
  //     ],
  //   },
  // };

  // (async () => {
  //   await S3.putBucketCors(params).promise();
  // })();

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
