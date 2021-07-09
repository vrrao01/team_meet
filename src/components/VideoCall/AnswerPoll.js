import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { setAnswer } from "../../modules/database";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../firebase";

/**
 * Allows non-admins to answer a poll question and saves to database
 * @param {string} props.poll Question and options separted by /
 * @param {number} props.chatid ChatID of current meeting
 * @param {function} props.handleClose Callback to fire once poll is answered
 */
const AnswerPoll = (props) => {
  const { user } = useAuth();
  let splitPoll = props.poll.split("/");
  let question = splitPoll[0];
  const [selected, setSelected] = useState();
  let optionsList = [];
  for (let i = 1; i <= 4; i++) {
    optionsList.push(
      <Row
        className={
          "poll-option " + (selected === i ? "poll-option-select" : " ")
        }
      >
        <button className="btn" onClick={() => setSelected(i)}>
          {splitPoll[i]}
        </button>
      </Row>
    );
  }
  const handleSubmit = () => {
    setAnswer(db, props.chatid, selected, user.email, splitPoll[0]);
    props.handleClose();
  };
  return (
    <Modal
      show={true}
      onHide={props.handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header className="bg-dark text-light">
        <Modal.Title>Poll</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Container>
          <Row className="my-2" style={{ fontSize: "1.5em" }}>
            <b>{question}</b>
          </Row>
          <Container className="poll-question" style={{ overflow: "scroll" }}>
            {optionsList}
          </Container>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={handleSubmit}
          style={{ backgroundColor: "#464eb8" }}
          disabled={!selected}
        >
          Submit Answer
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AnswerPoll;
