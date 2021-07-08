import React, { createRef, useState } from "react";
import { useEffect } from "react";
import { Modal, Button, Row, Col, Container, Form } from "react-bootstrap";
import { setQuestion } from "../modules/database";
import { db } from "../firebase";
import PollResults from "./PollResults";

var count = 0;

const PollAdmin = (props) => {
  const question = createRef();
  const option1 = createRef();
  const option2 = createRef();
  const option3 = createRef();
  const option4 = createRef();
  const [result, setResult] = useState(false);
  const [endPoll, setEndPoll] = useState(false);
  const [questionDetails, setQuestionDetails] = useState({});

  useEffect(() => {
    count = count + 1;
    console.log("count+ = ", count);
    return () => {
      count = count - 1;
      console.log("count -= ", count);
    };
  }, []);

  const submitQuestion = () => {
    let q = {
      Valid: true,
      Question: question.current.value,
      Option1: option1.current.value,
      Option2: option2.current.value,
      Option3: option3.current.value,
      Option4: option4.current.value,
    };
    setQuestionDetails(q);
    setQuestion(db, props.chatid, q);
    setResult(true);
  };

  return (
    <Modal
      show={true}
      onHide={props.handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header className="bg-dark text-light">
        <Modal.Title>Create Poll</Modal.Title>
      </Modal.Header>
      {!result && (
        <div>
          <Modal.Body>
            <Container>
              <Row>
                <Form.Control
                  size="lg"
                  type="text"
                  className="mb-3"
                  placeholder="Question"
                  ref={question}
                />
              </Row>
              <Row>
                <Col>
                  <Form.Control
                    className="mb-3"
                    type="text"
                    placeholder="Option 1"
                    ref={option1}
                  />
                </Col>
                <Col>
                  <Form.Control
                    type="text"
                    className="mb-3"
                    placeholder="Option 2"
                    ref={option2}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Control
                    type="text"
                    className="mb-3"
                    placeholder="Option 3"
                    ref={option3}
                  />
                </Col>
                <Col>
                  <Form.Control
                    type="text"
                    className="mb-3"
                    placeholder="Option 4"
                    ref={option4}
                  />
                </Col>
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={submitQuestion}>
              Submit Question
            </Button>
          </Modal.Footer>
        </div>
      )}
      {result && (
        <PollResults
          chatid={props.chatid}
          question={questionDetails["Question"]}
        />
      )}
    </Modal>
  );
};

export default PollAdmin;
