import React from "react";
import { ChatEngineWrapper, ChatSocket, ChatFeed } from "react-chat-engine";

const VideoCallChat = (props) => {
  console.log("props = ", props);
  return (
    <div className="video-call-chat" style={{ width: "100%", height: "100%" }}>
      <ChatEngineWrapper>
        <ChatSocket
          projectID={process.env.REACT_APP_CHAT_ENGINE_PROJECT_ID}
          chatID={props.chatid}
          chatAccessKey={props.chatAccessKey}
          senderUsername={props.email}
        />

        <ChatFeed activeChat={props.chatid} />
      </ChatEngineWrapper>
    </div>
  );
};

export default VideoCallChat;
