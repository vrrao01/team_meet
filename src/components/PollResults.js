import React from "react";
import { useEffect } from "react";
import { db } from "../firebase";

const PollResults = (props) => {
  useEffect(() => {
    console.log("poll results props =", props);
    db.collection(props.chatid)
      .doc("Poll")
      .collection("Answer")
      .where("question", "==", props.question)
      .onSnapshot((qs) => {
        qs.forEach((doc) => {
          console.log("qs doc = ", doc.data());
        });
      });
  });
  return <div></div>;
};

export default PollResults;
