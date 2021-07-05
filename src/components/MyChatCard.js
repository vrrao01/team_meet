import { ChatEngineContext } from "react-chat-engine";
import React, { useContext } from "react";
import "../App.css";
import Brightness1Icon from "@material-ui/icons/Brightness1";
import SvgIcon from "@material-ui/core/SvgIcon";

var _require = require("html-to-text"),
  htmlToText = _require.htmlToText;

const MyChatCard = (props) => {
  var chat = props.chat;
  const { conn, activeChat, setActiveChat } = useContext(ChatEngineContext);

  // Helper functions
  function daySinceSent(date) {
    if (!date) return "";
    var day = date.substr(8, 2);
    var month = date.substr(5, 2);
    var year = date.substr(0, 4);
    var sent = new Date(month + " " + day + " " + year).toString();
    return sent.substr(4, 6);
  }
  function didReadLastMessage(chat) {
    var didReadLastMessage = true;
    chat.people.map(function (chat_person) {
      if (conn && conn.userName === chat_person.person.username) {
        didReadLastMessage = chat.last_message.id === chat_person.last_read;
      }
      return true;
    });
    return didReadLastMessage;
  }

  // Returning Chat Card if chat has been fetched
  if (!(Object.keys(chat).length === 0) || !(chat.constructor === Object)) {
    return (
      <div
        className={
          "p-3 my-font chat-card d-flex flex-column " +
          (activeChat === chat.id && "chat-card-active")
        }
        onClick={() => {
          setActiveChat(chat.id);
        }}
      >
        <div className="chat-card-header d-flex flex-row">
          <div className="chat-card-title" style={{ flex: "10" }}>
            <b>{chat.title}</b>
          </div>
          <div className="chat-card-unread" style={{ flex: "1" }}>
            {!didReadLastMessage(chat) && (
              <SvgIcon
                id="chat-card-unread-symbol"
                component={Brightness1Icon}
                style={{
                  color: activeChat === chat.id ? "white" : "#464eb8",
                  width: "15px",
                }}
              ></SvgIcon>
            )}
          </div>
        </div>
        <div className="d-flex flex-row justify-content-between chat-card-second-row">
          <div
            className={
              "chat-card-last-message " +
              (activeChat === chat.id ? "chat-card-last-message-active" : "")
            }
            style={{ flex: "8" }}
          >
            {htmlToText(chat.last_message.text)}
          </div>
          <div
            className={
              "chat-card-date " +
              (activeChat === chat.id ? "chat-card-date-active" : "")
            }
            style={{ flex: "2" }}
          >
            {daySinceSent(chat.last_message.created)}
          </div>
        </div>
      </div>
    );
  }

  // Returning empty div if chat is not yet fetched
  return <div></div>;
};

export default MyChatCard;
