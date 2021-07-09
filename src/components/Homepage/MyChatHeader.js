import React from "react";
import { Col, Row, Container, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import SvgIcon from "@material-ui/core/SvgIcon";
import VideoCallIcon from "@material-ui/icons/VideoCall";

/**
 * Custom Header for each chat with an additional button to
 * start a meeting.
 * @param {object} props.chat Contains chat details eg: title
 */
const MyChatHeader = (props) => {
  let chat = props.chat;
  var title = chat ? chat.title : "";
  var roomName = chat ? chat.id : 0;
  if (chat) {
    return (
      <Container
        style={{
          position: "absolute",
          zIndex: "1",
          padding: "15px",
          backgroundColor: "rgba(242, 237, 237,0.9)",
        }}
      >
        <Row>
          <Col xs={9}>
            <h4>
              <b>{title}</b>
            </h4>
          </Col>
          <Col xs={3}>
            <Link
              to={{
                pathname: `${window.location.origin}/video/${roomName}`,
              }}
              className="btn video-call-button"
              target="_blank"
              style={{ color: "white" }}
            >
              <SvgIcon
                component={VideoCallIcon}
                style={{ color: "white", marginRight: "2px" }}
              ></SvgIcon>
              Meet
            </Link>
          </Col>
        </Row>
      </Container>
    );
  }

  // Return spinner if chat hasn't been fetched
  return (
    <Container className="text-center">
      <Spinner animation="border" variant="primary" className="my-3" />
    </Container>
  );
};

export default MyChatHeader;
