const fs = require("fs");
const path = require("path");

const csvText = fs.readFileSync(
  path.resolve(__dirname, "mood_data.csv"),
  "utf-8"
);

const rows = csvText
  .split("\n")
  .map((row) => row.trim())
  .filter((row) => row);
const headers = rows[0].split(",");

const moodData = rows.slice(1).map((row) => {
  const values = row.split(",");
  return headers.reduce((obj, header, index) => {
    obj[header] =
      header === "userId" || header === "intensity"
        ? Number(values[index])
        : values[index];
    return obj;
  }, {});
});
module.exports = moodData;
