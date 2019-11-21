import React from "react";
import { Switch, Route } from "react-router-dom";

import "semantic-ui-css/semantic.min.css";
import NavBar from "./components/NavBar";
import DashBoard from "./components/DashBoard";
import Photos from "./components/Photos";
import Landing from "./components/Landing";
import Login from "./components/Login";

function App() {
  return (
    <main>
      <NavBar />
      <Switch>
        <Route exact path="/landing" component={Landing} />
        <Route path="/dashboard" component={DashBoard} />
        <Route path="/photos" component={Photos} />
        <Route path="/login" component={Login} />
      </Switch>
    </main>
  );
}

export default App;
