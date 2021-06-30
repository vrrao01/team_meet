import React from "react";
import { useAuth } from "../contexts/AuthContext";

function Chats() {
  const { user } = useAuth();
  console.log(user);
  return <h3>Current user is {user.email}</h3>;
}

export default Chats;
