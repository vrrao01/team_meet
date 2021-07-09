import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import Container from "react-bootstrap/Container";
import { downloadResults } from "../../modules/csv";

/**
 * Listens for participants' poll answers and displays a count
 * @param {Array} props.options List of options to current poll question
 * @param {string} props.question Ongoing poll question
 */
const PollResults = (props) => {
  const [stats, setStats] = useState([]);

  // Listens to database for new answers
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

  let optionTiles = [];
  for (let i = 1; i <= 4; i++)
    optionTiles.push(
      <div className="option-tile d-flex flex-column">
        <div className="option-tile-title">{`Option ${i}`}</div>
        <div>{stats.filter((o) => o.option === i).length}</div>
      </div>
    );

  return (
    <div>
      <Container>
        <div className="d-flex flex-row">
          {optionTiles[0]}
          {optionTiles[1]}
        </div>
        <div className="d-flex flex-row">
          {optionTiles[2]}
          {optionTiles[3]}
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
