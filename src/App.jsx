import React from "react";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import RootRoute from "./routes/route";
import GlobalStyle from "./styles/GlobalStyle";
import theme from "./theme/theme";

const App = () => {
  return (
    <Container>
      <ThemeProvider theme={theme}>
        <RootRoute></RootRoute>
        <GlobalStyle></GlobalStyle>
      </ThemeProvider>
    </Container>
  );
};

export default App;

const Container = styled.div`
  width: 500px;
  margin: auto;
`;
