const pool = require("../config/dbConfig");

exports.view_all_questions = async (req, res) => {
  try {
    const { filter } = req.params;
    const { filter_value } = req.params;

    //Getting the name of the html file to be rendered
    const current_url = req.url;
    const page_name = current_url.split("/");
    const page_file = page_name[1] + ".ejs";
    // console.log(page_file);

    if (filter == undefined) {
      await pool.query(
        "SELECT * FROM question_paper",
        function (err, data, fields) {
          if (page_file.includes("teacher_page")) {
            if (err) throw err;
            return res.render(page_file, {
              path: req.url,
              userdata: data.rows,
              user: req.user.name,
            });
          } else if (page_file.includes("student_page")) {
            if (err) throw err;
            return res.render(page_file, {
              path: req.url,
              userdata: data.rows,
            });
          }
        }
      );
    } else {
      if (filter.toLowerCase() === "syllabus") {
        await pool.query(
          "SELECT * FROM question_paper WHERE LOWER(syllabus) = $1",
          [filter_value.toLowerCase()],
          function (err, data, fields) {
            if (page_file.includes("teacher_page")) {
              if (err) throw err;
              return res.render(page_file, {
                path: req.url,
                userdata: data.rows,
                user: req.user.name,
              });
            } else if (page_file.includes("student_page")) {
              if (err) throw err;
              return res.render(page_file, {
                path: req.url,
                userdata: data.rows,
              });
            }
          }
        );
      } else if (filter.toLowerCase() === "semester") {
        await pool.query(
          "SELECT * FROM question_paper WHERE semester = $1",
          [filter_value],
          function (err, data, fields) {
            if (page_file.includes("teacher_page")) {
              if (err) throw err;
              return res.render(page_file, {
                path: req.url,
                userdata: data.rows,
                user: req.user.name,
              });
            } else if (page_file.includes("student_page")) {
              if (err) throw err;
              return res.render(page_file, {
                path: req.url,
                userdata: data.rows,
              });
            }
          }
        );
      } else if (filter.toLowerCase() === "chapter") {
        await pool.query(
          "SELECT * FROM question_paper WHERE LOWER(chapter) LIKE $1",
          [filter_value.toLowerCase() + "%"],
          function (err, data, fields) {
            if (page_file.includes("teacher_page")) {
              if (err) throw err;
              return res.render(page_file, {
                path: req.url,
                userdata: data.rows,
                user: req.user.name,
              });
            } else if (page_file.includes("student_page")) {
              if (err) throw err;
              return res.render(page_file, {
                path: req.url,
                userdata: data.rows,
              });
            }
          }
        );
      } else if (filter.toLowerCase() === "question") {
        await pool.query(
          "SELECT * FROM question_paper WHERE LOWER(question) LIKE $1",
          [filter_value.toLowerCase() + "%"],
          function (err, data, fields) {
            if (page_file.includes("teacher_page")) {
              if (err) throw err;
              return res.render(page_file, {
                path: req.url,
                userdata: data.rows,
                user: req.user.name,
              });
            } else if (page_file.includes("student_page")) {
              if (err) throw err;
              return res.render(page_file, {
                path: req.url,
                userdata: data.rows,
              });
            }
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
