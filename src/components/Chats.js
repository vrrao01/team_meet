import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navbar, Container, Button } from "react-bootstrap";
import whiteLogo from "../logoLineWhite.png";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import SvgIcon from "@material-ui/core/SvgIcon";
import { auth } from "../firebase";
import { ChatEngine } from "react-chat-engine";
import axios from "axios";

function Chats() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await auth.signOut();
    } catch (err) {
      console.log(err);
    }
  };
  console.log(process.env.REACT_APP_CHAT_ENGINE_PROJECT_ID);
  useEffect(() => {
    axios
      .get("https://api.chatengine.io/users/me", {
        headers: {
          "project-id": process.env.REACT_APP_CHAT_ENGINE_PROJECT_ID,
          "user-name": user.email,
          "user-secret": user.uid,
        },
      })
      .then(() => setLoading(false))
      .catch(() => {
        let userForm = new FormData();
        userForm.append("email", user.email);
        userForm.append("username", user.email);
        userForm.append("secret", user.uid);
        axios
          .post("https://api.chatengine.io/users", userForm, {
            headers: {
              "private-key": process.env.REACT_APP_CHAT_ENGINE_PRIVATE_KEY,
            },
          })
          .then(() => setLoading(false))
          .catch((err) => console.log(err));
      });
  });
  return (
    <div
      style={{
        position: "absolute",
        top: "0px",
        left: "0px",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <img
              alt="Team meeT"
              src={whiteLogo}
              width="150"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <button className="btn text-light" onClick={handleLogout}>
              <SvgIcon
                component={ExitToAppOutlinedIcon}
                style={{ color: "white" }}
              ></SvgIcon>
              <Navbar.Text style={{ marginLeft: "10px" }}>Logout</Navbar.Text>
            </button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {loading && <h1>Loading...</h1>}
      {!loading && (
        <ChatEngine
          height="calc(100vh-57px)"
          style={{ flexGrow: "100" }}
          projectID={process.env.REACT_APP_CHAT_ENGINE_PROJECT_ID}
          userName={user.email}
          userSecret={user.uid}
          renderChatHeader={(chat) => {
            console.log(chat);
            if (chat)
              return (
                <Container className="text-center">
                  <h4>{chat.title}</h4>
                  <Button>Call</Button>
                </Container>
              );
          }}
        />
      )}
    </div>
  );
}

export default Chats;
