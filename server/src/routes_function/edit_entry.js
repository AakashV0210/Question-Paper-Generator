const pool = require("../config/dbConfig");

exports.edit_page = async (req, res) => {
  const { id } = req.params;

  await pool.query(
    "SELECT * FROM question_paper WHERE id = $1",
    [id],
    function (err, data, fields) {
      if (err) throw err;
      console.log(data.rows[0]);
      return res.render("teacher_page.ejs", {
        path: req.url,
        edit_data: data.rows[0],
        user: req.user.name,
      });
    }
  );
};

exports.edit_entry = async (req, res) => {
  const { id } = req.params;
  const { syllabus } = req.params;
  const { semester } = req.params;
  const { chapter } = req.params;
  const { unit } = req.params;
  const { marks } = req.params;
  const { priority } = req.params;
  const { question } = req.params;
  try {
    await pool.query(
      "UPDATE question_paper SET syllabus = $1, semester = $2, chapter = $3, unit = $4, marks = $5, priority = $6, question = $7 WHERE id = $8",
      [syllabus, semester, chapter, unit, marks, priority, question, id]
    );
    return res.redirect("/teacher_page/view-questions-all");
  } catch (error) {
    throw error;
  } finally {
    // alert("This question already exists");
    return res.redirect("/teacher_page/edit-page/" + id);
  }
  await pool.query(
    "UPDATE question_paper SET syllabus = $1, semester = $2, chapter = $3, unit = $4, marks = $5, priority = $6, question = $7 WHERE id = $8",
    [syllabus, semester, chapter, unit, marks, priority, question, id]
  );
  return res.redirect("/teacher_page/view-questions-all");
};
