import React, { useState, createRef } from "react";
import { useEffect } from "react";
import CloseIcon from "@material-ui/icons/Close";
import SvgIcon from "@material-ui/core/SvgIcon";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Form, Container, Row } from "react-bootstrap";
import { getAllNotes, saveNote } from "../../modules/database";
import { db } from "../../firebase";

/**
 * Allows call participants to take notes during a meeting
 */
const Notes = (props) => {
  // State Variables
  const [select, setSelect] = useState(false);
  const [noteID, setNoteID] = useState();
  const [noteBody, setNoteBody] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const [saveMessage, setSaveMessage] = useState("");
  const [docList, setDocList] = useState();

  // References to note title and body
  const notes = createRef();
  const titleRef = createRef();

  const handleSave = () => {
    let saveStatus = saveNote(
      db,
      props.chatid,
      props.uid,
      noteID,
      titleRef.current.value,
      notes.current.state.value
    );
    if (saveStatus) {
      setSaveMessage("Saved");
      setTimeout(() => setSaveMessage(""), 3000);
    } else {
      setSaveMessage("Could not save");
      setTimeout(() => setSaveMessage(""), 3000);
    }
  };

  /**
   * Fetches existing notes created by user for editing
   */
  useEffect(() => {
    getAllNotes(db, props.chatid, props.uid).then((docs) => {
      let list = docs.map((doc) => (
        <Row className="my-2 note-option" key={doc.id}>
          <button
            className="btn note-option-button"
            onClick={() => {
              setNoteTitle(doc.title);
              setNoteID(doc.id);
              setNoteBody(doc.body);
              setSelect(true);
            }}
          >
            {doc.title}
          </button>
        </Row>
      ));
      setDocList(list);
    });
  }, [props]);

  return (
    <Container>
      <div className="mt-3 mb-2 d-flex flex-row">
        <div style={{ flex: 5 }}>
          <h3>Notes</h3>
        </div>
        <div style={{ flex: 1 }}>
          <button className="btn" onClick={props.handleClose}>
            <SvgIcon component={CloseIcon} />
          </button>
        </div>
      </div>
      {!select && (
        <div>
          <div className=" my-3 d-flex flex-row">
            <div style={{ flex: 3 }}>
              <h4>Select a Note</h4>
            </div>
            <div style={{ flex: 2 }}>
              <button
                className="btn download-result-button"
                onClick={() => setSelect(true)}
              >
                Create New
              </button>
            </div>
          </div>
          <div>{docList}</div>
        </div>
      )}
      {select && (
        <div>
          <div className=" my-3 d-flex flex-row">
            <div style={{ flex: 3 }}>
              <Form>
                <Form.Group>
                  <Form.Control
                    type="text"
                    defaultValue={noteTitle}
                    ref={titleRef}
                  />
                </Form.Group>
              </Form>
            </div>
            <div className="mx-1" style={{ flex: 1 }}>
              <button
                className="btn download-result-button"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
          {saveMessage && (
            <p className="text-muted" style={{ fontSize: "0.7em" }}>
              {saveMessage}{" "}
            </p>
          )}
          <div
            style={{
              maxWidth: "25vw",
              maxHeight: "65vh",
              overflow: "scroll",
            }}
          >
            <ReactQuill theme="snow" ref={notes} defaultValue={noteBody} />
          </div>
        </div>
      )}
    </Container>
  );
};

export default Notes;
