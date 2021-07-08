import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import Container from "react-bootstrap/Container";
import { downloadResults } from "../modules/csv";

const PollResults = (props) => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    let unsubscribe = db
      .collection(props.chatid)
      .doc("Poll")
      .collection("Answer")
      .where("question", "==", props.question)
      .onSnapshot((qs) => {
        let answerStats = [];
        qs.forEach((doc) => {
          let data = doc.data();
          answerStats.push({ email: doc.id, option: data.option });
        });
        setStats(answerStats);
      });
    return unsubscribe;
  }, [props]);
  return (
    <div>
      <Container>
        <div className="d-flex flex-row">
          <div className="option-tile d-flex flex-column">
            <div className="option-tile-title">Option 1</div>
            <div>{stats.filter((o) => o.option === 1).length}</div>
          </div>
          <div className="option-tile d-flex flex-column">
            <div className="option-tile-title">Option 2</div>
            <div>{stats.filter((o) => o.option === 2).length}</div>
          </div>
        </div>
        <div className="d-flex flex-row">
          <div className="option-tile d-flex flex-column">
            <div className="option-tile-title">Option 3</div>
            <div>{stats.filter((o) => o.option === 3).length}</div>
          </div>
          <div className="option-tile d-flex flex-column">
            <div className="option-tile-title">Option 4</div>
            <div>{stats.filter((o) => o.option === 4).length}</div>
          </div>
        </div>
        <div className="text-center">
          <button
            className="btn download-result-button"
            onClick={() =>
              downloadResults(stats, props.options, props.question)
            }
          >
            Download Detailed Results
          </button>
        </div>
      </Container>
    </div>
  );
};

export default PollResults;
