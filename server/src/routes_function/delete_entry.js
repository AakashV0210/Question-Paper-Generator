const pool = require("../config/dbConfig");

exports.delete_entry = async (req, res) => {
  const { id } = req.params;

  await pool.query("DELETE FROM question_paper WHERE id = $1 ", [id]);
  return res.redirect("/teacher_page/view-questions-all");
};
