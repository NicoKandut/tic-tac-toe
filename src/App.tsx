import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Welcome from "./components/pages/Welcome";
import theme from "./components/common/theme";
import Versus from "./components/pages/Versus";
import Local from "./components/pages/Local";
import Computer from "./components/pages/Computer";
import Test from "./components/pages/Test";

const AppLayout = styled.div`
  display: grid;
  padding: ${theme.gap};
  gap: ${theme.gap};
  max-width: 1000px;
  margin: auto;
  min-height: 100vh;
  max-height: 100vh;
  grid-template-rows: repeat(4, auto) 1fr auto;
`;

function App() {
  return (
    <Router basename="/tic-tac-toe">
      <AppLayout>
        <Header />
        <Switch>
          <Route path={`/local`}>
            <Local />
          </Route>
          <Route path={`/versus`}>
            <Versus />
          </Route>
          <Route path={`/computer`}>
            <Computer />
          </Route>

          <Route path={`/test`}>
            <Test />
          </Route>
          <Route path={`/`}>
            <Welcome />
          </Route>
        </Switch>
        <Footer />
      </AppLayout>
    </Router>
  );
}

export default App;
