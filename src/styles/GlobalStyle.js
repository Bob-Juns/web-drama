import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
    ${reset}

    @font-face {
      font-family: 'NEXON Lv2 Gothic';
      src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/NEXON Lv2 Gothic.woff')
        format('woff');
      font-weight: normal;
      font-style: normal;
    }

    @font-face {
      font-family: 'NEXON Lv2 Gothic Bold';
      src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/NEXON Lv2 Gothic Bold.woff')
        format('woff');
      font-weight: normal;
      font-style: normal;
    }

    * {
    margin: 0;
    font-family: 'NEXON Lv2 Gothic', sans-serif;
    box-sizing: border-box;
  }

  html {
    font-family: 'NEXON Lv2 Gothic', sans-serif;
  }

  body {
    font-family: 'NEXON Lv2 Gothic', sans-serif;
    -webkit-font-smoothing: antialiased;
    -ms-overflow-style: none;
  }
  body::-webkit-scrollbar {
    display: none;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: 'NEXON Lv2 Gothic Bold', sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button,
  input,
  select,
  textarea {
    background-color: transparent;
    border: 0;
    &:focus {
      outline: none;
      box-shadow: none;
    }
  }

  a,
  button,
  select {
    cursor: pointer;
  }

  input,
  textarea {
    cursor: text;
  }

  ul,
  ol {
    padding-left: 0;
    list-style: none;
  }
`;

export default GlobalStyle;
