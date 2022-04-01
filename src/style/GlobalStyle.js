import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}
  *, *::before, *::after {
    box-sizing: border-box;
  }
  body{
    font-family:"Malgun Gothic", "Lucida Grande", Tahoma, Verdana, AppleGothic, UnDotum, sans-serif;
    background-color:#edf2fb;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

export default GlobalStyle;
