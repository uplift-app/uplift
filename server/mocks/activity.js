const fs = require("fs");
const path = require("path");

const csvText = fs.readFileSync(
  path.resolve(__dirname, "activity_data.csv"),
  "utf-8"
);

const rows = csvText
  .split("\n")
  .map((row) => row.trim())
  .filter((row) => row);
const headers = rows[0].split(",");

const activityData = rows.slice(1).map((row) => {
  const values = row.split(",");
  return headers.reduce((obj, header, index) => {
    if (header === "userId" || header === "duration") {
      obj[header] = Number(values[index]);
    } else if (header === "isHabit") {
      obj[header] = values[index] === "TRUE";
    } else {
      obj[header] = values[index];
    }
    return obj;
  }, {});
});

module.exports = activityData;
