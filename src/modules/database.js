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

const getAllNotes = async (database, chatid, uid) => {
  let qs = await database.collection(chatid).doc("Notes").collection(uid).get();
  let notes = qs.docs.map((doc) => {
    let myobj = doc.data();
    myobj["id"] = doc.id;
    return myobj;
  });
  return notes;
};

const saveNote = async (database, chatid, uid, docid, title, body) => {
  try {
    await database
      .collection(chatid)
      .doc("Notes")
      .collection(uid)
      .doc(docid)
      .set({ title, body });

    return true;
  } catch (e) {
    return false;
  }
};

export {
  getQuestionsDoc,
  getAnswersDoc,
  setAnswer,
  setQuestion,
  getAllNotes,
  saveNote,
};
