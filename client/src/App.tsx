import React from "react";
import "./main.less";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LoginPage from "./pages/login";
import RegistrationPage from "./pages/registration";
import OnlineUsersPage from "./pages/onlineUsers";

const App = () => {
  return (
    <Router>
      <main className={"main"}>
        <div className={"header-wrapper"}>
          <img
            src={
              "https://themerex.net/wp-content/uploads/2020/08/Group-6413@2x.png"
            }
          ></img>
        </div>
        <Switch>
          <Route path="/registration">
            <RegistrationPage />
          </Route>
          <Route path="/users">
            <OnlineUsersPage />
          </Route>
          <Route path="/">
            <LoginPage />
          </Route>
        </Switch>
      </main>
    </Router>
  );
};

export default App;
