import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Dropdown from "react-bootstrap/Dropdown";
import MicIcon from "@material-ui/icons/Mic";
import MicOffIcon from "@material-ui/icons/MicOff";
import VideocamIcon from "@material-ui/icons/Videocam";
import VideocamOffIcon from "@material-ui/icons/VideocamOff";
import ScreenShareIcon from "@material-ui/icons/ScreenShare";
import StopScreenShareIcon from "@material-ui/icons/StopScreenShare";
import SvgIcon from "@material-ui/core/SvgIcon";
import PanToolIcon from "@material-ui/icons/PanTool";
import ChatIcon from "@material-ui/icons/Chat";
import CallEndIcon from "@material-ui/icons/CallEnd";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import GetAppIcon from "@material-ui/icons/GetApp";
import PeopleIcon from "@material-ui/icons/People";
import ParticipantsModal from "./Participants";
import axios from "axios";
import VideoCallChat from "./VideoCallChat";
import PollAdmin from "./PollAdmin";
import AnswerPoll from "./AnswerPoll";
import { db } from "../firebase";
import { getQuestionsDoc } from "../modules/database";
import { downloadAttendance } from "../modules/csv";
import PollIcon from "@material-ui/icons/Poll";
import { getOptions } from "../modules/jitis";

const VideoCall = () => {
  const api = useRef();
  const { chatid } = useParams();
  const { user } = useAuth();
  var isAdmin = useRef(false);
  var poll = useRef();

  // State variables
  const [loading, setLoading] = useState(true);
  const [micIcon, setMicIcon] = useState(false);
  const [videoIcon, setVideoIcon] = useState(false);
  const [screenShareIcon, setScreenShareIcon] = useState(false);
  const [handRaised, setHandRaised] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const [participantsList, setParticipantsList] = useState([]);
  const [error, setError] = useState("");
  const [showChats, setShowChats] = useState(false);
  const [popUpError, setPopUpError] = useState("");

  const [showAdminPoll, setShowAdminPoll] = useState(false);
  const [showPoll, setShowPoll] = useState(false);
  // Event Handlers
  const onLoad = async (title) => {
    api.current.executeCommand("subject", title);
    setMicIcon(!(await api.current.isAudioMuted()));
    setVideoIcon(!(await api.current.isVideoMuted()));
    setLoading(false);
  };
  const muteHandler = () => {
    api.current.executeCommand("toggleAudio");
  };
  const videoHandler = () => {
    api.current.executeCommand("toggleVideo");
  };
  const screenShareHandler = () => {
    api.current.executeCommand("toggleShareScreen");
    if (!screenShareIcon) {
      setPopUpError(
        "If you are unable to screen share, click on the center of the screen & try again."
      );
      setTimeout(() => setPopUpError(""), 3000);
    }
  };
  const raiseHand = () => {
    api.current.executeCommand("toggleRaiseHand");
  };
  const kickParticipant = (id) => {
    api.current.executeCommand("kickParticipant", id);
  };
  const pinParticipant = (id) => {
    api.current.pinParticipant(id);
  };
  const participantEventListener = () => {
    setParticipantsList(api.current.getParticipantsInfo());
  };
  useEffect(() => {
    // Variables to help authenticate user
    var myChats = [];
    var myChatIDs = [];
    var userBelongsInChat = false;
    var title = "Meeting";

    // Check if user belongs in current meeting group
    var config = {
      method: "get",
      url: "https://api.chatengine.io/chats/",
      headers: {
        "Project-ID": process.env.REACT_APP_CHAT_ENGINE_PROJECT_ID,
        "User-Name": user.email,
        "User-Secret": user.uid,
      },
    };
    axios(config)
      .then((response) => {
        myChats = response.data;
        myChatIDs = myChats.map((obj) => obj.id);
        // console.log("Mychats = ", myChats);
        // console.log("mychatids =", myChatIDs);
        for (const idx in myChatIDs) {
          if (myChatIDs[idx] === Number.parseInt(chatid)) {
            userBelongsInChat = true;
            title = `${myChats[idx].title}`;
            if (myChats[idx].admin.username === user.email)
              isAdmin.current = true;
          }
        }
        if (userBelongsInChat) {
          const domain = "meet.jit.si";
          const options = {
            ...getOptions(chatid, user.email),
            onload: () => onLoad(title),
          };
          api.current = new window.JitsiMeetExternalAPI(domain, options);
          api.current.addListener("audioMuteStatusChanged", (e) => {
            setMicIcon(!e.muted);
          });
          api.current.addListener("videoMuteStatusChanged", (e) => {
            setVideoIcon(!e.muted);
          });
          api.current.addListener("screenSharingStatusChanged", (e) => {
            setScreenShareIcon(e.on);
          });
          api.current.addListener("raiseHandUpdated", (e) => {
            if (api.current._myUserID === e.id) {
              setHandRaised(e.handRaised);
            }
          });
          api.current.addListener(
            "participantJoined",
            participantEventListener
          );
          api.current.addListener(
            "participantKickedOut",
            participantEventListener
          );
          api.current.addListener("participantLeft", participantEventListener);
          getQuestionsDoc(db, chatid).onSnapshot((doc) => {
            var question = doc.data();
            if (question && question.Valid && !isAdmin.current) {
              poll.current = `${question.Question}/${question.Option1}/${question.Option2}/${question.Option3}/${question.Option4}`;
              setShowPoll(true);
            }
          });
        } else {
          setError("Sorry! Couldn't determine if you belong in this meeting.");
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setError("Sorry! Couldn't determine if you belong in this meeting.");
        setLoading(false);
      });
  }, [chatid, user]);
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {error && (
        <Container className="mt-5 pt-5">
          <Alert variant="danger">{error}</Alert>
        </Container>
      )}
      {!error && !loading && (
        <Navbar bg="dark" variant="dark">
          <Container style={{ justifyContent: "center" }}>
            <Dropdown>
              <Dropdown.Toggle
                id="dropdown-button-dark-example1"
                className="icon-link"
                variant=""
              >
                <SvgIcon component={MoreHorizIcon} style={{ color: "white" }} />
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu-dark">
                <Dropdown.Item
                  as="button"
                  onClick={() =>
                    api.current.executeCommand("toggleVirtualBackgroundDialog")
                  }
                >
                  <SvgIcon
                    component={AccountBoxIcon}
                    style={{ color: "white" }}
                  />
                  Virtual Background
                </Dropdown.Item>
                <Dropdown.Item
                  as="button"
                  onClick={() => {
                    setParticipantsList(api.current.getParticipantsInfo());
                    setShowParticipants(true);
                  }}
                >
                  <SvgIcon component={PeopleIcon} style={{ color: "white" }} />
                  View Participants
                </Dropdown.Item>
                {isAdmin.current && (
                  <Dropdown.Item
                    as="button"
                    onClick={() => {
                      downloadAttendance(api.current.getParticipantsInfo());
                    }}
                  >
                    <SvgIcon
                      component={GetAppIcon}
                      style={{ color: "white" }}
                    />
                    Download Attendance List
                  </Dropdown.Item>
                )}
                {isAdmin.current && (
                  <Dropdown.Item
                    as="button"
                    onClick={() => setShowAdminPoll(true)}
                  >
                    <SvgIcon component={PollIcon} style={{ color: "white" }} />
                    Create Poll
                  </Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
            <button className="icon-link " onClick={muteHandler}>
              <SvgIcon
                component={micIcon ? MicIcon : MicOffIcon}
                style={{ color: "white" }}
              />
            </button>
            <button className="icon-link " onClick={videoHandler}>
              <SvgIcon
                component={videoIcon ? VideocamIcon : VideocamOffIcon}
                style={{ color: "white" }}
              />
            </button>
            <button className="icon-link " onClick={screenShareHandler}>
              <SvgIcon
                component={
                  screenShareIcon ? StopScreenShareIcon : ScreenShareIcon
                }
                style={{ color: "white" }}
              />
            </button>
            <button className="icon-link " onClick={raiseHand}>
              <SvgIcon
                component={PanToolIcon}
                style={{ color: handRaised ? "yellow" : "white" }}
              />
            </button>
            <button
              className="icon-link "
              onClick={() => setShowChats(!showChats)}
            >
              <SvgIcon component={ChatIcon} style={{ color: "white" }} />
            </button>
            <button
              style={{
                backgroundColor: "red",
                height: "50px",
                width: "50px",
                borderRadius: "50px",
                border: "none",
              }}
              className="icon-link "
              onClick={() => window.close()}
            >
              <SvgIcon component={CallEndIcon} style={{ color: "white" }} />
            </button>
          </Container>
        </Navbar>
      )}
      <div
        style={{
          display: loading ? "none" : "flex",
          height: "100%",
          flexGrow: "1",
          paddingBottom: "10px",
          flexDirection: "row",
        }}
      >
        {showChats && (
          <div
            style={{
              width: "25vw",
              height: "85vh",
              position: "relative",
              marginLeft: "5px",
              flex: "2",
            }}
          >
            <VideoCallChat email={user.email} uid={user.uid} chatid={chatid} />
          </div>
        )}
        <div id="video-call" style={{ flex: 4 }}></div>
      </div>
      {showParticipants && (
        <ParticipantsModal
          onHide={() => setShowParticipants(false)}
          kickParticipant={kickParticipant}
          pinParticipant={pinParticipant}
          participantsList={participantsList}
          muteAll={() => api.current.executeCommand("muteEveryone")}
          isAdmin={isAdmin.current}
        />
      )}
      {loading && (
        <center>
          <div class="lds-facebook">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </center>
      )}
      {isAdmin.current && showAdminPoll && (
        <PollAdmin
          chatid={chatid}
          handleClose={() => setShowAdminPoll(false)}
        />
      )}
      {!isAdmin.current && showPoll && (
        <AnswerPoll
          chatid={chatid}
          poll={poll.current}
          handleClose={() => setShowPoll(false)}
        />
      )}
      <div className="pop-up-error">
        {popUpError && <Alert variant="info">{popUpError}</Alert>}
      </div>
    </div>
  );
};

export default VideoCall;
