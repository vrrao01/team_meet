/**
 * Returns reference to Firestore document containing poll question
 */
const getQuestionsDoc = (database, chatid) => {
  return database
    .collection(chatid)
    .doc("Poll")
    .collection("Question")
    .doc("details");
};

/**
 * Returns reference to Firestore document containing participant's answer
 */
const getAnswersDoc = (database, chatid, email) => {
  return database
    .collection(chatid)
    .doc("Poll")
    .collection("Answer")
    .doc(email);
};

/**
 * Registers a participant's answer on Firestore
 */
const setAnswer = (database, chatid, option, email, question) => {
  let doc = getAnswersDoc(database, chatid, email);
  doc.set({ option, question });
};

/**
 * Registers a new poll question on Firestore
 */
const setQuestion = (database, chatid, question) => {
  let doc = getQuestionsDoc(database, chatid);
  doc.set(question);
};

export { getQuestionsDoc, getAnswersDoc, setAnswer, setQuestion };
