import { createGlobalStyle } from 'styles/styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    line-height: 1.5;
  }
  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

`;

export default GlobalStyle;
