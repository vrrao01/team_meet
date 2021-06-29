import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Login from "./Login"

// import { AuthProvider } from "../contexts/AuthContext"

// import Chats from "./Chats"

function App() {
  return (
    <div>
      <Router>
        {/* <AuthProvider> */}
          <Switch>
            {/* <Route path="/chats" component={Chats} /> */}
            <Route path="/" component={Login} />
          </Switch>
        {/* </AuthProvider> */}
      </Router>
    </div>
  )
}

export default App