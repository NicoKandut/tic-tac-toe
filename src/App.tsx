import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FlexColumn from "./components/common/FlexColumn";
import styled from "styled-components";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Welcome from "./components/pages/Welcome";
import Game from "./components/Game";
import theme from "./components/common/theme";

const AppFlexColumn = styled(FlexColumn)`
  > * {
    width: 100%;
    max-width: 1000px;
    padding: ${theme.gap};
  }
`;

function App() {
  return (
    <AppFlexColumn>
      <Header />
      <Router basename="/tic-tac-toe">
        <Switch>
          <Route path={`/versus`}>
            <Game />
          </Route>
          <Route path={`/`}>
            <Welcome />
          </Route>
        </Switch>
      </Router>
      <Footer />
    </AppFlexColumn>
  );
}

export default App;
