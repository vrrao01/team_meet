import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Navbar, Container, Row, Col, Spinner } from "react-bootstrap";
import whiteLogo from "../logoLineWhite.png";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import SvgIcon from "@material-ui/core/SvgIcon";
import { auth } from "../firebase";
import "../App.css";
import {
  ChatEngine,
  ChatList,
  ChatCard,
  NewChatForm,
  ChatFeed,
  IceBreaker,
  MessageBubble,
  IsTyping,
  NewMessageForm,
  ChatSettings,
  ChatSettingsTop,
  PeopleSettings,
  PhotosSettings,
  OptionsSettings,
} from "react-chat-engine";
import axios from "axios";

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
      <Container fluid style={{ fontFamily: "Ubuntu" }}>
        <ChatEngine
          height="calc(100vh - 60px)"
          projectID={process.env.REACT_APP_CHAT_ENGINE_PROJECT_ID}
          userName={user.email}
          userSecret={user.uid}
          renderChatList={(chatAppState) => <ChatList {...chatAppState} />}
          renderChatCard={(chat, index) => (
            <ChatCard key={`${index}`} chat={chat} />
          )}
          renderNewChatForm={(creds) => <NewChatForm creds={creds} />}
          renderChatFeed={(chatAppState) => <ChatFeed {...chatAppState} />}
          renderChatHeader={(chat) => {
            var title = chat ? chat.title : "";
            var roomName = chat ? chat.id : 0;
            if (chat) {
              return (
                <Container
                  style={{
                    position: "absolute",
                    zIndex: "1",
                    padding: "15px",
                    backgroundColor: "rgba(242, 237, 237,0.8)",
                  }}
                >
                  <Row>
                    <Col xs={10}>
                      <h4>{title}</h4>
                    </Col>
                    <Col xs={2}>
                      <Link
                        to={{
                          pathname: `${window.location.origin}/video/${roomName}`,
                        }}
                        className="btn btn-info"
                        target="_blank"
                      >
                        <SvgIcon
                          component={VideoCallIcon}
                          style={{ color: "white" }}
                        ></SvgIcon>
                      </Link>
                    </Col>
                  </Row>
                </Container>
              );
            }
            return (
              <Container className="text-center">
                <Spinner
                  animation="border"
                  variant="primary"
                  className="my-3"
                />
              </Container>
            );
          }}
          renderIceBreaker={(chat) => <IceBreaker />}
          renderMessageBubble={(
            creds,
            chat,
            lastMessage,
            message,
            nextMessage
          ) => (
            <MessageBubble
              lastMessage={lastMessage}
              message={message}
              nextMessage={nextMessage}
              chat={chat}
            />
          )}
          renderSendingMessage={(
            creds,
            chat,
            lastMessage,
            message,
            nextMessage
          ) => (
            <MessageBubble
              sending={true}
              lastMessage={lastMessage}
              message={message}
              nextMessage={nextMessage}
              chat={chat}
            />
          )}
          renderIsTyping={(typers) => <IsTyping />}
          renderNewMessageForm={(creds, chatID) => <NewMessageForm />}
          renderChatSettings={(chatAppState) => (
            <ChatSettings {...chatAppState} />
          )}
          renderChatSettingsTop={(creds, chat) => <ChatSettingsTop />}
          renderPeopleSettings={(creds, chat) => <PeopleSettings />}
          renderPhotosSettings={(chat) => <PhotosSettings />}
          renderOptionsSettings={(creds, chat) => <OptionsSettings />}
        />
      </Container>
    </div>
  );
}

export default Chats;
