const pool = require("../config/dbConfig");

exports.view_all_questions = async (req, res) => {
  try {
    const { filter } = req.params;
    const { filter_value } = req.params;
    // filter = filter.toLowerCase();
    // console.log(filter);
    if (filter == undefined) {
      await pool.query(
        "SELECT * FROM question_paper",
        function (err, data, fields) {
          if (err) throw err;
          arr = data.rows;
          return res.render("teacher_page.ejs", {
            // userdata: Object.values(arr),
            title: "User List",
            userdata: "hello",
            // user: req.user.name,
          });
          // console.log(Object.values(data.rows));
          // return res.json(data.rows);
        }
      );
      // console.log(req.params);
      // return res.json(view_questions.rows);
    } else {
      if (filter.toLowerCase() === "syllabus") {
        const view_questions = await pool.query(
          "SELECT * FROM question_paper WHERE LOWER(syllabus) = $1",
          [filter_value.toLowerCase()]
        );
        // console.log(req.params);
        return res.json(view_questions.rows);
      } else if (filter.toLowerCase() === "semester") {
        const view_questions = await pool.query(
          "SELECT * FROM question_paper WHERE semester = $1",
          [filter_value]
        );
        // console.log(req.params);
        return res.json(view_questions.rows);
      } else if (filter.toLowerCase() === "chapter") {
        const view_questions = await pool.query(
          "SELECT * FROM question_paper WHERE LOWER(chapter) = $1",
          [filter_value.toLowerCase()]
        );
        // console.log(req.params);
        return res.json(view_questions.rows);
      } else if (filter.toLowerCase() === "unit") {
        const view_questions = await pool.query(
          "SELECT * FROM question_paper WHERE unit = $1",
          [filter_value]
        );
        // console.log(req.params);
        return res.json(view_questions.rows);
      } else if (filter.toLowerCase() === "marks") {
        const view_questions = await pool.query(
          "SELECT * FROM question_paper WHERE marks = $1",
          [filter_value]
        );
        // console.log(req.params);
        return res.json(view_questions.rows);
      } else if (filter.toLowerCase() === "priority") {
        const view_questions = await pool.query(
          "SELECT * FROM question_paper WHERE priority = $1",
          [filter_value]
        );
        // console.log(req.params);
        return res.json(view_questions.rows);
      } else if (filter.toLowerCase() === "questions") {
        const view_questions = await pool.query(
          "SELECT * FROM question_paper WHERE LOWER(question) = $1",
          [filter_value.toLowerCase()]
        );
        // console.log(req.params);
        return res.json(view_questions.rows);
      } else {
        const view_questions = await pool.query("SELECT * FROM question_paper");
        return res.json(view_questions.rows);
      }
    }
  } catch (err) {
    console.log(err);
  }
};
