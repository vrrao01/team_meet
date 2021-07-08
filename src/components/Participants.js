import React from "react";
import Modal from "react-bootstrap/Modal";
import SvgIcon from "@material-ui/core/SvgIcon";
import RoomIcon from "@material-ui/icons/Room";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import MicOffIcon from "@material-ui/icons/MicOff";

const ParticipantsModal = (props) => {
  console.log("participant props = ", props);
  let numberedList = [];
  numberedList = props.participantsList.map((part) => (
    <div
      className="participant-row d-flex flex-row align-items-center my-1 py-2"
      key={part.participantId}
    >
      <div className="pin-participant" style={{ flex: "1" }}>
        <button
          className="btn"
          onClick={() => props.pinParticipant(part.participantId)}
        >
          <SvgIcon component={RoomIcon}></SvgIcon>
        </button>
      </div>
      <div className="participant-name" style={{ flex: "10" }}>
        {part.formattedDisplayName}
      </div>
      {props.isAdmin && (
        <div className="kick-participant" style={{ flex: "1" }}>
          <button
            className="btn"
            onClick={() => props.kickParticipant(part.participantId)}
          >
            <SvgIcon component={RemoveCircleIcon}></SvgIcon>
          </button>
        </div>
      )}
    </div>
  ));
  return (
    <Modal show={true} onHide={props.onHide} centered>
      <Modal.Header className="bg-dark text-light">
        <Modal.Title
          as="div"
          className="d-flex flex-row"
          style={{ width: "100%" }}
        >
          <div style={{ flex: 1 }}>Participants</div>
          {props.isAdmin && (
            <div style={{ flex: 1 }}>
              <button
                className=" btn"
                style={{ fontSize: "0.8em", backgroundColor: "lightgray" }}
                onClick={props.muteAll}
              >
                <SvgIcon component={MicOffIcon}></SvgIcon>
                Mute All
              </button>
            </div>
          )}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: "75vh", overflow: "scroll" }}>
        <div className="d-flex flex-column"> {numberedList}</div>
      </Modal.Body>
    </Modal>
  );
};

export default ParticipantsModal;
