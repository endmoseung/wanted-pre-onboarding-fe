import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
  font-size: 16px;
}
 body {
    margin:0;
    padding:0;
  }

  a {
    text-decoration:none;
  }

  button{
    border: none;
    background: inherit;
    outline: none;
  }

  input{
    outline: none;
  }
`;

export default GlobalStyle;
