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

export { downloadAttendance };
