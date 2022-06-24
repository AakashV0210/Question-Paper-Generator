const pool = require("../config/dbConfig");

exports.view_all_questions = async (req, res) => {
  try {
    const { filter } = req.params;
    const { filter_value } = req.params;
    if (filter == undefined) {
      await pool.query(
        "SELECT * FROM question_paper",
        function (err, data, fields) {
          if (err) throw err;
          return res.render("teacher_page.ejs", {
            path: req.url,
            userdata: data.rows,
            user: req.user.name,
          });
        }
      );
    } else {
      if (filter.toLowerCase() === "syllabus") {
        await pool.query(
          "SELECT * FROM question_paper WHERE LOWER(syllabus) = $1",
          [filter_value.toLowerCase()],
          function (err, data, fields) {
            if (err) throw err;
            return res.render("teacher_page.ejs", {
              path: req.url,
              userdata: data.rows,
              user: req.user.name,
            });
          }
        );
      } else if (filter.toLowerCase() === "semester") {
        await pool.query(
          "SELECT * FROM question_paper WHERE semester = $1",
          [filter_value],
          function (err, data, fields) {
            if (err) throw err;
            return res.render("teacher_page.ejs", {
              path: req.url,
              userdata: data.rows,
              user: req.user.name,
            });
          }
        );
      } else if (filter.toLowerCase() === "chapter") {
        await pool.query(
          "SELECT * FROM question_paper WHERE LOWER(chapter) LIKE $1",
          [filter_value.toLowerCase() + "%"],
          function (err, data, fields) {
            if (err) throw err;
            console.log(data.rows);
            return res.render("teacher_page.ejs", {
              path: req.url,
              userdata: data.rows,
              user: req.user.name,
            });
          }
        );
      } else if (filter.toLowerCase() === "question") {
        await pool.query(
          "SELECT * FROM question_paper WHERE LOWER(question) LIKE $1",
          [filter_value.toLowerCase() + "%"],
          function (err, data, fields) {
            if (err) throw err;
            return res.render("teacher_page.ejs", {
              path: req.url,
              userdata: data.rows,
              user: req.user.name,
            });
          }
        );
      } else {
        const view_questions = await pool.query("SELECT * FROM question_paper");
        return res.json(view_questions.rows);
      }
    }
  } catch (err) {
    console.log(err);
  }
};
