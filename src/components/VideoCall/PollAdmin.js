import React, { createRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { getQuestionsDoc, setQuestion } from "../../modules/database";
import { db } from "../../firebase";
import PollResults from "./PollResults";

/**
 * Allows admin to post a poll question for all participants
 */
const PollAdmin = (props) => {
  // References to DOM Input elements
  const question = createRef();
  const option1 = createRef();
  const option2 = createRef();
  const option3 = createRef();
  const option4 = createRef();

  // State variables
  const [result, setResult] = useState(false);
  const [questionDetails, setQuestionDetails] = useState({});
  const [options, setOptions] = useState([]);

  // Saves question to database
  const submitQuestion = () => {
    let q = {
      Valid: true,
      Question: question.current.value,
      Option1: option1.current.value,
      Option2: option2.current.value,
      Option3: option3.current.value,
      Option4: option4.current.value,
    };
    let options = [q.Option1, q.Option2, q.Option3, q.Option4];
    setOptions(options);
    setQuestionDetails(q);
    setQuestion(db, props.chatid, q);
    setResult(true);
  };

  // Updates database to signify end of poll
  const handleEndPoll = () => {
    getQuestionsDoc(db, props.chatid).update({ Valid: false });
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
        <Modal.Title>{result ? "Poll Results" : "Create Poll"}</Modal.Title>
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
            <Button variant="primary" onClick={submitQuestion}>
              Submit Question
            </Button>
          </Modal.Footer>
        </div>
      )}
      {result && (
        <div>
          <Modal.Body>
            <PollResults
              chatid={props.chatid}
              question={questionDetails["Question"]}
              options={options}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleEndPoll}>
              End Poll
            </Button>
          </Modal.Footer>
        </div>
      )}
    </Modal>
  );
};

export default PollAdmin;
