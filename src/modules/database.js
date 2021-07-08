const getQuestionsDoc = (database, chatid) => {
  return database
    .collection(chatid)
    .doc("Poll")
    .collection("Question")
    .doc("details");
};

const getAnswersDoc = (database, chatid, email) => {
  return database
    .collection(chatid)
    .doc("Poll")
    .collection("Answer")
    .doc(email);
};

const setAnswer = (database, chatid, option, email, question) => {
  let doc = getAnswersDoc(database, chatid, email);
  doc.set({ option, question });
};

const setQuestion = (database, chatid, question) => {
  let doc = getQuestionsDoc(database, chatid);
  doc.set(question);
};
export { getQuestionsDoc, getAnswersDoc, setAnswer, setQuestion };
