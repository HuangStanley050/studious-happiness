import React from "react";
import { Switch, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import NavBar from "./components/NavBar";
import DashBoard from "./components/DashBoard";
import Photos from "./components/Photos";
import Landing from "./components/Landing";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <main>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/photos" component={Photos} />
        <PrivateRoute path="/dashboard" component={DashBoard} />
      </Switch>
    </main>
  );
}

export default App;
