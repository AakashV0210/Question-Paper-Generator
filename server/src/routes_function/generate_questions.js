const pool = require("../config/dbConfig");

exports.generate_questions = async (req, res) => {
  try {
    //GETTING QUESTIONS WITH PRIORITY 3
    const { semester } = req.params;
    const { syllabus } = req.params;
    const no_of_questions = 7;
    console.log(semester);

    const priority_3_questions = await pool.query(
      "SELECT question FROM question_paper WHERE priority = 3 AND LOWER(syllabus) = $1 AND semester = $2",
      // "SELECT question FROM question_paper WHERE priority = 3"
      [syllabus, semester]
    );
    let priority_3_arr = [];
    let generated_questions_arr = [];
    for (let i = 0; i < priority_3_questions.rows.length; i++) {
      priority_3_arr = priority_3_arr.concat(
        Object.values(priority_3_questions.rows[i])
      );
    }

    for (let i = 0; i < 1; i++) {
      let index = Math.floor(Math.random() * priority_3_arr.length);
      generated_questions_arr = generated_questions_arr.concat(
        priority_3_arr[index]
      );
      priority_3_arr.splice(index, 1);
    }

    //GETTING QUESTIONS WITH PRIORITY 2

    const priority_2_questions = await pool.query(
      "SELECT question FROM question_paper WHERE priority = 2 AND LOWER(syllabus) = $1 AND semester = $2",
      // "SELECT question FROM question_paper WHERE priority = 2"
      [syllabus, semester]
    );
    let priority_2_arr = [];
    for (let i = 0; i < priority_2_questions.rows.length; i++) {
      priority_2_arr = priority_2_arr.concat(
        Object.values(priority_2_questions.rows[i])
      );
      priority_2_arr = priority_2_arr.concat(
        Object.values(priority_2_questions.rows[i])
      );
    }

    //GETTING QUESTIONS WITH PRIORITY 1

    const priority_1_questions = await pool.query(
      "SELECT question FROM question_paper WHERE priority = 1 AND LOWER(syllabus) = $1 AND semester = $2",
      // "SELECT question FROM question_paper WHERE priority = 1"
      [syllabus, semester]
    );
    let priority_1_arr = [];
    for (let i = 0; i < priority_1_questions.rows.length; i++) {
      priority_1_arr = priority_1_arr.concat(
        Object.values(priority_1_questions.rows[i])
      );
    }

    priority_1_arr = priority_1_arr.concat(priority_2_arr); //MERGING PRIORITY 1 AND PRIORITY 2 QUESTIONS ARRAY TO RANDOMIZE QUESTIONS FROM THEM

    for (let i = 0; i < 2; i++) {
      let index = Math.floor(Math.random() * priority_1_arr.length);

      generated_questions_arr = generated_questions_arr.concat(
        priority_1_arr[index]
      );
      if (priority_1_arr[index] == priority_1_arr[index - 1]) {
        priority_1_arr.splice(index - 1, 1);
        priority_1_arr.splice(index - 1, 1);
        console.log(priority_1_arr);
      } else if (priority_1_arr[index] == priority_1_arr[index + 1]) {
        priority_1_arr.splice(index, 1);
        priority_1_arr.splice(index, 1);
        console.log(priority_1_arr);
      } else {
        priority_1_arr.splice(index, 1);
        console.log(priority_1_arr);
      }
    }
    let GENERATED_QUESTIONS = {};
    for (let i = 0; i < generated_questions_arr.length; i++) {
      GENERATED_QUESTIONS[i + 1] = generated_questions_arr[i];
    }
    console.log(Object.values(GENERATED_QUESTIONS));
    // return res.json(GENERATED_QUESTIONS);
    return res.render("teacher_page.ejs", {
      user: req.user.name,
      path: req.url,
      generator_data: Object.values(GENERATED_QUESTIONS),
    });
  } catch (err) {
    console.error(err.message);
  }
};
