/**
 * Function that downloads a CSV file of participants in meeting
 * @param {object} data List of participant emails
 */
const downloadAttendance = (data) => {
  let emails = ["email"];
  data.map((obj) => {
    if (!(obj.displayName in emails)) {
      emails.push(obj.displayName);
    }
    return obj.displayName;
  });
  data = emails.join("\n");
  const blob = new Blob([data], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  let a = document.createElement("a");
  a.style = "display:none";
  document.body.appendChild(a);
  a.href = url;
  a.download = "attendance.csv";
  a.click();
  document.body.removeChild(a);
};

/**
 * Function that download a CSV file with poll results
 * @param {Array} data Contains objects with choices of each participant
 * @param {string} question Poll question
 * @param {Array} option Choices for poll question
 */
const downloadResults = (data, options, question) => {
  let formattedData = data.map(
    (obj) => `${obj.email},${options[obj.option - 1]}`
  );
  let csvRows = ["email,option"];
  formattedData.forEach((item) => csvRows.push(item));
  formattedData = csvRows.join("\n");
  const blob = new Blob([formattedData], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  let a = document.createElement("a");
  a.style = "display:none";
  a.href = url;
  document.body.appendChild(a);
  a.download = `${question}_result.csv`;
  a.click();
  document.body.removeChild(a);
};

export { downloadAttendance, downloadResults };
