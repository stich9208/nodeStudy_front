import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./style/GlobalStyle";
import { RecoilRoot } from "recoil";
import RootRouter from "./routes";
import theme from "./style/themeStyle";

ReactDOM.render(
  <RecoilRoot>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <RootRouter />
    </ThemeProvider>
  </RecoilRoot>,
  document.getElementById("root")
);
