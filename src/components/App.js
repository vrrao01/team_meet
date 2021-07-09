import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Login from "./Authentication/Login";
import { AuthProvider } from "../contexts/AuthContext";
import Chats from "./Homepage/Chats";
import Register from "./Authentication/Register";
import PrivateRoute from "./Routers/PrivateRoute";
import PublicRoute from "./Routers/PublicRoute";
import VideoCall from "./VideoCall/VideoCall";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute path="/video/:chatid" component={VideoCall} />
          <PrivateRoute exact path="/" component={Chats} />
          <PublicRoute
            restricted={true}
            path="/register"
            component={Register}
          />
          <PublicRoute restricted={true} path="/login" component={Login} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
