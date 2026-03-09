import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    margin: auto 0;
    padding: 0;
    cursor: default;
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;