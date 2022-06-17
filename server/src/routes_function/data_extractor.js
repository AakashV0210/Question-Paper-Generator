const fs = require("fs");
const pool = require("../config/dbConfig.js");
const fastcsv = require("fast-csv");

exports.csv_to_db = async (req, res) => {
  let stream = fs.createReadStream(
    "C:/Users/aakas/Desktop/Question-Paper-Generator/server/assets/question_paper.csv"
  );
  let csvData = [];
  let csvStream = fastcsv
    .parse()
    .on("data", function (data) {
      csvData.push(data);
    })
    .on("end", function () {
      // remove the first line: header
      csvData.shift();
      const query =
        "INSERT INTO question_paper (id, syllabus, semester, chapter, unit, marks, priority, question) VALUES (default, $1, $2, $3, $4, $5, $6, $7)";
      pool.connect((err, client, done) => {
        if (err) throw err;
        try {
          csvData.forEach((row) => {
            client.query(query, row, (err, res) => {
              if (err) {
                console.log(err.stack);
              } else {
                console.log("inserted " + res.rowCount + " row:", row);
              }
            });
          });
        } finally {
          done();
        }
      });
    });
  stream.pipe(csvStream);
  return res.json({ message: "entered data, check server log" });
};
