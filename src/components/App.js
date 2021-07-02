import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Login from "./Login";
import { AuthProvider } from "../contexts/AuthContext";
import Chats from "./Chats";
import Register from "./Register";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import VideoCall from "./VideoCall";

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
