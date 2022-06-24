const pool = require("../config/dbConfig");

exports.add_entry = async (req, res) => {
  const { syllabus } = req.params;
  const { semester } = req.params;
  const { chapter } = req.params;
  const { unit } = req.params;
  const { marks } = req.params;
  const { priority } = req.params;
  const { question } = req.params;

  await pool.query(
    "INSERT INTO question_paper (id, syllabus, semester, chapter, unit, marks, priority, question) VALUES (default, $1, $2, $3, $4, $5, $6, $7)",
    [syllabus, semester, chapter, unit, marks, priority, question]
  );

  return res.render("teacher_page.ejs", {
    user: req.user.name,
    path: req.url,
    add_data: "YOUR ENTRY HAS SUCCESSFULLY BEEN ADDED TO THE DATABASE!",
  });
};
