import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FlexColumn from "./components/common/FlexColumn";
import styled from "styled-components";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Welcome from "./components/pages/Welcome";
import theme from "./components/common/theme";
import Versus from "./components/pages/Versus";
import Local from "./components/pages/Local";

const AppFlexColumn = styled(FlexColumn)`
  > * {
    width: 100%;
    max-width: 1000px;
    padding: ${theme.gap};
  }
`;

function App() {
  return (
    <Router basename="/tic-tac-toe">
      <AppFlexColumn>
        <Header />
        <Switch>
          <Route path={`/local`}>
            <Local />
          </Route>
          <Route path={`/versus`}>
            <Versus />
          </Route>
          <Route path={`/`}>
            <Welcome />
          </Route>
        </Switch>
        <Footer />
      </AppFlexColumn>
    </Router>
  );
}

export default App;
