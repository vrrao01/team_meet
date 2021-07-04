import React, { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navbar, Container } from "react-bootstrap";
import whiteLogo from "../logoLineWhite.png";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import SvgIcon from "@material-ui/core/SvgIcon";
import { auth } from "../firebase";
import "../App.css";
import { ChatEngineWrapper, ChatEngine } from "react-chat-engine";
import axios from "axios";
import MyChatCard from "./MyChatCard";
import MyChatHeader from "./MyChatHeader";

function Chats() {
  const { user } = useAuth();
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await auth.signOut();
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    axios
      .get("https://api.chatengine.io/users/me", {
        headers: {
          "project-id": process.env.REACT_APP_CHAT_ENGINE_PROJECT_ID,
          "user-name": user.email,
          "user-secret": user.uid,
        },
      })
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
          .catch((err) => console.log(err));
      });
  });
  return (
    <div className="chat-screen">
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
      <Container fluid style={{ fontFamily: "Rubik" }}>
        <ChatEngineWrapper>
          <ChatEngine
            height="calc(100vh - 60px)"
            projectID={process.env.REACT_APP_CHAT_ENGINE_PROJECT_ID}
            userName={user.email}
            userSecret={user.uid}
            renderChatCard={(chat, index) => (
              <MyChatCard key={`${index}`} chat={chat} />
            )}
            renderChatHeader={(chat) => <MyChatHeader chat={chat} />}
          />
        </ChatEngineWrapper>
      </Container>
    </div>
  );
}

export default Chats;
