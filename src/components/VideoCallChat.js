import React from "react";
import { ChatEngineWrapper, Socket, ChatFeed } from "react-chat-engine";

const VideoCallChat = (props) => {
  return (
    <div className="video-call-chat" style={{ width: "100%", height: "100%" }}>
      <ChatEngineWrapper>
        <Socket
          projectID={process.env.REACT_APP_CHAT_ENGINE_PROJECT_ID}
          userName={props.email}
          userSecret={props.uid}
        />

        <ChatFeed activeChat={props.chatid} />
      </ChatEngineWrapper>
    </div>
  );
};

export default VideoCallChat;
