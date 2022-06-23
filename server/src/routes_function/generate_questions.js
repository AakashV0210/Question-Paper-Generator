const pool = require("../config/dbConfig");

exports.generate_questions = async (req, res) => {
  try {
    const { semester } = req.params;
    const { syllabus } = req.params;
    const no_of_questions = 7;

    //GENERATING 2 MARK QUESTIONS--------------------------------------------------------------------------------------------------

    let GENERATED_MARK_2_QUESTIONS = [];

    let total_mark_2_no = 10; //total number of 2 mark questions to be generated

    let mark_2_arr = []; //stores all 2 marks questions for randomly generating
    let generated_mark_2_arr = []; //randomly generated 2 mark questions

    const mark_2_questions = await pool.query(
      "SELECT question FROM question_paper WHERE marks = 2 AND LOWER(syllabus) = $1 AND semester = $2",
      [syllabus, semester]
    );

    for (let i = 0; i < mark_2_questions.rows.length; i++) {
      mark_2_arr = mark_2_arr.concat(Object.values(mark_2_questions.rows[i]));
    }

    for (let i = 0; i < total_mark_2_no; i++) {
      let rand_index = Math.floor(Math.random() * mark_2_arr.length);
      generated_mark_2_arr = generated_mark_2_arr.concat(
        mark_2_arr[rand_index]
      );
      mark_2_arr.splice(rand_index, 1);
    }

    console.log("2 mark questions:", generated_mark_2_arr);

    //GENERATING 6 MARK QUESTIONS------------------------------------------------------------------------------------------------

    let GENERATED_MARK_6_QUESTIONS = [];
    let total_mark_6_no = 7; //total number of 6 mark questions to be generated

    let priority_3_mark_6_no = 2; //number of 6 mark questions with priority 3 to be generated
    let priority_3_mark_6_arr = []; //stores all 6 marks questions with priority 3 for randomly generating
    let generated_priority_3_mark_6_arr = []; //randomly generated 6 mark questions with priority 3

    let priority_1_mark_6_no = 2; //number of 6 mark questions with priority 1 to be generated
    let priority_1_mark_6_arr = []; //stores all 6 marks questions with priority 1 for randomly generating
    let generated_priority_1_mark_6_arr = []; //randomly generated 6 mark questions with priority 1

    let generated_mark_6_arr = []; // randomly generated 6 mark questions without priority restrictions

    let generated_mark_4_and_2_arr = []; //randomly generated question with 4 and 2 mark subparts

    let generated_mark_3_and_3_arr = []; //randomly generated question with 3 and 3 mark subparts

    let generated_mark_2_and_2_and_2_arr = []; //randomly generated question with 2,2 and 2 mark subparts

    //------------priority 3 mark 6-------------------------

    const priority_3_mark_6_questions = await pool.query(
      "SELECT question FROM question_paper WHERE priority = 3 AND marks = 6 AND LOWER(syllabus) = $1 AND semester = $2",
      [syllabus, semester]
    );

    for (let i = 0; i < priority_3_mark_6_questions.rows.length; i++) {
      priority_3_mark_6_arr = priority_3_mark_6_arr.concat(
        Object.values(priority_3_mark_6_questions.rows[i])
      );
    }

    for (let i = 0; i < priority_3_mark_6_no; i++) {
      let rand_index = Math.floor(Math.random() * priority_3_mark_6_arr.length);
      generated_priority_3_mark_6_arr = generated_priority_3_mark_6_arr.concat(
        priority_3_mark_6_arr[rand_index]
      );
      priority_3_mark_6_arr.splice(rand_index, 1);
    }

    console.log(
      "generated 6 mark questions with priority 3:",
      generated_priority_3_mark_6_arr
    );

    //-----------priority 1 mark 6-----------------------------------

    const priority_1_mark_6_questions = await pool.query(
      "SELECT question FROM question_paper WHERE priority = 1 AND marks = 6 AND LOWER(syllabus) = $1 AND semester = $2",
      [syllabus, semester]
    );

    for (let i = 0; i < priority_1_mark_6_questions.rows.length; i++) {
      priority_1_mark_6_arr = priority_1_mark_6_arr.concat(
        Object.values(priority_1_mark_6_questions.rows[i])
      );
    }

    for (let i = 0; i < priority_1_mark_6_no; i++) {
      let rand_index = Math.floor(Math.random() * priority_1_mark_6_arr.length);
      generated_priority_1_mark_6_arr = generated_priority_1_mark_6_arr.concat(
        priority_1_mark_6_arr[rand_index]
      );
      priority_1_mark_6_arr.splice(rand_index, 1);
    }

    console.log(
      "generated 6 mark questions with priority 1:",
      generated_priority_1_mark_6_arr
    );

    // Generating random 6 mark questions and split 6 mark questions----------------------

    let mark_list_arr = [2, 3, 4, 6]; //different marks for generating questions with
    let count_mark_6 = 0;

    for (
      let j = 0;
      j < total_mark_6_no - priority_1_mark_6_no - priority_3_mark_6_no;
      j++
    ) {
      let rand_mark_index = Math.floor(Math.random() * mark_list_arr.length);
      let rand_mark_choice = mark_list_arr[rand_mark_index]; //selecting a number for marks
      if (rand_mark_choice != 6) {
        mark_list_arr.splice(rand_mark_index, 1); //ensures similar split mark question patterns dont occur over and over again
      }
      console.log(rand_mark_choice);

      //generating a 6 mark question

      if (rand_mark_choice === 6) {
        let all_mark_6_questions_1_3; //all 6 mark questions selected with priority 1 and 3
        let all_mark_6_questions_2; //all 6 mark questions selected with priority 2

        let all_mark_6_arr = [];
        count_mark_6++;

        if (count_mark_6 == 1) {
          //selecting questions with priority 1 and 3

          all_mark_6_questions_1_3 = await pool.query(
            "SELECT question FROM question_paper WHERE question NOT IN($3, $4, $5, $6) AND priority IN (1,3) AND marks = 6 AND LOWER(syllabus) = $1 AND semester = $2",
            [
              syllabus,
              semester,
              generated_priority_3_mark_6_arr[0],
              generated_priority_3_mark_6_arr[1],
              generated_priority_1_mark_6_arr[0],
              generated_priority_1_mark_6_arr[1],
            ]
          );

          //selecting questions with priority 2

          all_mark_6_questions_2 = await pool.query(
            "SELECT question FROM question_paper WHERE priority = 2 AND marks = 6 AND LOWER(syllabus) = $1 AND semester = $2",
            [syllabus, semester]
          );
        } else if (count_mark_6 == 2) {
          //selecting questions with priority 1 and 3

          all_mark_6_questions_1_3 = await pool.query(
            "SELECT question FROM question_paper WHERE question NOT IN($3, $4, $5, $6, $7) AND priority IN (1,3) AND marks = 6 AND LOWER(syllabus) = $1 AND semester = $2",
            [
              syllabus,
              semester,
              generated_priority_3_mark_6_arr[0],
              generated_priority_3_mark_6_arr[1],
              generated_priority_1_mark_6_arr[0],
              generated_priority_1_mark_6_arr[1],
              generated_mark_6_arr[0],
            ]
          );

          //selecting questions with priority 2

          all_mark_6_questions_2 = await pool.query(
            "SELECT question FROM question_paper WHERE question NOT IN($3) AND priority = 2 AND marks = 6 AND LOWER(syllabus) = $1 AND semester = $2",
            [syllabus, semester, generated_mark_6_arr[0]]
          );
        } else if (count_mark_6 == 3) {
          //selecting questions with priority 1 and 3

          all_mark_6_questions_1_3 = await pool.query(
            "SELECT question FROM question_paper WHERE question NOT IN($3, $4, $5, $6, $7, $8) AND priority IN (1,3) AND marks = 6 AND LOWER(syllabus) = $1 AND semester = $2",
            [
              syllabus,
              semester,
              generated_priority_3_mark_6_arr[0],
              generated_priority_3_mark_6_arr[1],
              generated_priority_1_mark_6_arr[0],
              generated_priority_1_mark_6_arr[1],
              generated_mark_6_arr[0],
              generated_mark_6_arr[1],
            ]
          );

          //selecting questions with priority 2

          all_mark_6_questions_2 = await pool.query(
            "SELECT question FROM question_paper WHERE question NOT IN($3, $4) AND priority = 2 AND marks = 6 AND LOWER(syllabus) = $1 AND semester = $2",
            [
              syllabus,
              semester,
              generated_mark_6_arr[0],
              generated_mark_6_arr[1],
            ]
          );
        }

        for (let i = 0; i < all_mark_6_questions_1_3.rows.length; i++) {
          all_mark_6_arr = all_mark_6_arr.concat(
            Object.values(all_mark_6_questions_1_3.rows[i])
          );
        }
        console.log(all_mark_6_arr);

        for (let i = 0; i < all_mark_6_questions_2.rows.length; i++) {
          all_mark_6_arr = all_mark_6_arr.concat(
            Object.values(all_mark_6_questions_2.rows[i])
          );
          all_mark_6_arr = all_mark_6_arr.concat(
            Object.values(all_mark_6_questions_2.rows[i])
          );
        }

        console.log(all_mark_6_arr);

        //randomly generating one question out of the ones selected
        for (let i = 0; i < 1; i++) {
          let rand_index = Math.floor(Math.random() * all_mark_6_arr.length);
          generated_mark_6_arr = generated_mark_6_arr.concat(
            all_mark_6_arr[rand_index]
          );
          all_mark_6_arr.splice(rand_index, 1);
        }

        console.log(generated_mark_6_arr);
      }

      if (rand_mark_choice === 4) {
        let all_mark_4_arr = []; //all 4 mark questions selected
        let all_mark_2_arr = []; //all 2 mark questions selected
        let temp_mark_4_arr = []; //randomly select one 4 mark question out of the ones generated
        let temp_mark_2_arr = []; //randomly select one 2 mark question out of the ones generated

        //select all 4 mark questions
        const all_mark_4_questions = await pool.query(
          "SELECT question FROM question_paper WHERE marks = 4 AND LOWER(syllabus) = $1 AND semester = $2",
          [syllabus, semester]
        );

        for (let i = 0; i < all_mark_4_questions.rows.length; i++) {
          all_mark_4_arr = all_mark_4_arr.concat(
            Object.values(all_mark_4_questions.rows[i])
          );
        }
        console.log(all_mark_4_arr);

        //select all 2 mark questions
        const all_mark_2_questions = await pool.query(
          "SELECT question FROM question_paper WHERE question NOT IN ($3, $4, $5, $6, $7, $8, $9, $10, $11, $12) AND marks = 2 AND LOWER(syllabus) = $1 AND semester = $2",
          [
            syllabus,
            semester,
            generated_mark_2_arr[0],
            generated_mark_2_arr[1],
            generated_mark_2_arr[2],
            generated_mark_2_arr[3],
            generated_mark_2_arr[4],
            generated_mark_2_arr[5],
            generated_mark_2_arr[6],
            generated_mark_2_arr[7],
            generated_mark_2_arr[8],
            generated_mark_2_arr[9],
          ]
        );

        for (let i = 0; i < all_mark_2_questions.rows.length; i++) {
          all_mark_2_arr = all_mark_2_arr.concat(
            Object.values(all_mark_2_questions.rows[i])
          );
        }

        console.log(all_mark_2_arr);

        for (let i = 0; i < 1; i++) {
          let rand_index = Math.floor(Math.random() * all_mark_4_arr.length);
          temp_mark_4_arr = temp_mark_4_arr.concat(all_mark_4_arr[rand_index]);
          all_mark_4_arr.splice(rand_index, 1);
        }

        for (let i = 0; i < 1; i++) {
          let rand_index = Math.floor(Math.random() * all_mark_2_arr.length);
          temp_mark_2_arr = temp_mark_2_arr.concat(all_mark_2_arr[rand_index]);
          all_mark_2_arr.splice(rand_index, 1);
        }

        //enter the 4 and 2 mark question as a string for the two-part question
        // let str =
        //   "(a). " +
        //   temp_mark_4_arr[0] +
        //   "(4M); (b). " +
        //   temp_mark_2_arr[0] +
        //   "(2M)";

        //concatenate the question string with the generate array for 4 and 2 mark question
        generated_mark_4_and_2_arr =
          generated_mark_4_and_2_arr.concat(temp_mark_4_arr);
        generated_mark_4_and_2_arr =
          generated_mark_4_and_2_arr.concat(temp_mark_2_arr);

        console.log(generated_mark_4_and_2_arr);
      }

      if (rand_mark_choice === 3) {
        let all_mark_3_arr = [];
        let temp_mark_3_arr = [];

        const all_mark_3_questions = await pool.query(
          "SELECT question FROM question_paper WHERE marks = 3 AND LOWER(syllabus) = $1 AND semester = $2",
          [syllabus, semester]
        );

        for (let i = 0; i < all_mark_3_questions.rows.length; i++) {
          all_mark_3_arr = all_mark_3_arr.concat(
            Object.values(all_mark_3_questions.rows[i])
          );
        }

        console.log(all_mark_3_arr);

        //randomly select two questions out of all selected
        for (let i = 0; i < 2; i++) {
          let rand_index = Math.floor(Math.random() * all_mark_3_arr.length);
          temp_mark_3_arr = temp_mark_3_arr.concat(all_mark_3_arr[rand_index]);
          all_mark_3_arr.splice(rand_index, 1);
        }

        // let str =
        //   "(a). " +
        //   temp_mark_3_arr[0] +
        //   "(3M); (b). " +
        //   temp_mark_3_arr[1] +
        //   "(3M)";

        generated_mark_3_and_3_arr =
          generated_mark_3_and_3_arr.concat(temp_mark_3_arr);

        console.log(generated_mark_3_and_3_arr);
      }

      if (rand_mark_choice === 2) {
        let all_mark_2_arr = [];
        let temp_mark_2_arr = [];

        const all_mark_2_questions = await pool.query(
          "SELECT question FROM question_paper WHERE question NOT IN ($3, $4, $5, $6, $7, $8, $9, $10, $11, $12) AND marks = 2 AND LOWER(syllabus) = $1 AND semester = $2",
          [
            syllabus,
            semester,
            generated_mark_2_arr[0],
            generated_mark_2_arr[1],
            generated_mark_2_arr[2],
            generated_mark_2_arr[3],
            generated_mark_2_arr[4],
            generated_mark_2_arr[5],
            generated_mark_2_arr[6],
            generated_mark_2_arr[7],
            generated_mark_2_arr[8],
            generated_mark_2_arr[9],
          ]
        );

        for (let i = 0; i < all_mark_2_questions.rows.length; i++) {
          all_mark_2_arr = all_mark_2_arr.concat(
            Object.values(all_mark_2_questions.rows[i])
          );
        }

        console.log(all_mark_2_arr);

        //randomly select two questions out of all selected
        for (let i = 0; i < 3; i++) {
          let rand_index = Math.floor(Math.random() * all_mark_2_arr.length);
          temp_mark_2_arr = temp_mark_2_arr.concat(all_mark_2_arr[rand_index]);
          all_mark_2_arr.splice(rand_index, 1);
        }

        // let str =
        //   "(a). " +
        //   temp_mark_2_arr[0] +
        //   "(2M); (b). " +
        //   temp_mark_2_arr[1] +
        //   "(2M); (c). " +
        //   temp_mark_2_arr[2] +
        //   "(2M)";

        generated_mark_2_and_2_and_2_arr =
          generated_mark_2_and_2_and_2_arr.concat(temp_mark_2_arr);

        console.log(generated_mark_2_and_2_and_2_arr);
      }
    }

    //GENERATING 10 MARK QUESTIONS------------------------------------------------------------------------------------------------------

    console.log("10 mark questons:");

    let GENERATED_MARK_10_QUESTIONS = [];

    let mark_10_list_arr = [5, 10]; //different marks for generating questions with

    let count_10_mark_5 = 0;
    let count_10_mark_10 = 0;
    let total_mark_10_no = 3;

    let generated_mark_5_and_5_arr = [];
    let temp_mark_5_arr = [];

    let generated_all_mark_10_arr = [];

    for (let j = 0; j < total_mark_10_no; j++) {
      let rand_mark_index = Math.floor(Math.random() * mark_10_list_arr.length);
      let rand_mark_choice = mark_10_list_arr[rand_mark_index]; //selecting a number for marks

      if (count_10_mark_10 == 1) {
        mark_10_list_arr.splice(1, 1); //ensures similar split mark question patterns dont occur over and over again
      }
      if (count_10_mark_5 == 1) {
        mark_10_list_arr.splice(0, 1); //ensures similar split mark question patterns dont occur over and over again
      }

      console.log(rand_mark_choice);

      //generating a 10 mark question

      if (rand_mark_choice === 10) {
        count_10_mark_10++;

        let all_mark_10_questions;
        let all_mark_10_arr = [];

        if (count_10_mark_10 == 1) {
          all_mark_10_questions = await pool.query(
            "SELECT question FROM question_paper WHERE marks = 10 AND LOWER(syllabus) = $1 AND semester = $2",
            [syllabus, semester]
          );
        } else if (count_10_mark_10 == 2) {
          all_mark_10_questions = await pool.query(
            "SELECT question FROM question_paper WHERE question NOT IN ($3) AND marks = 10 AND LOWER(syllabus) = $1 AND semester = $2",
            [syllabus, semester, generated_all_mark_10_arr[0]]
          );
        }

        for (let i = 0; i < all_mark_10_questions.rows.length; i++) {
          all_mark_10_arr = all_mark_10_arr.concat(
            Object.values(all_mark_10_questions.rows[i])
          );
        }

        console.log("10 all:", all_mark_10_arr);

        for (let i = 0; i < 1; i++) {
          let rand_index = Math.floor(Math.random() * all_mark_10_arr.length);
          generated_all_mark_10_arr = generated_all_mark_10_arr.concat(
            all_mark_10_arr[rand_index]
          );
          all_mark_10_arr.splice(rand_index, 1);
        }

        console.log(generated_all_mark_10_arr);
      }

      if (rand_mark_choice === 5) {
        count_10_mark_5++;

        let all_mark_5_arr = [];

        let all_mark_5_questions;

        if (count_10_mark_5 == 1) {
          all_mark_5_questions = await pool.query(
            "SELECT question FROM question_paper WHERE marks = 5 AND LOWER(syllabus) = $1 AND semester = $2",
            [syllabus, semester]
          );
        } else if (count_10_mark_5 == 2) {
          all_mark_5_questions = await pool.query(
            "SELECT question FROM question_paper WHERE question NOT IN ($3, $4) AND marks = 5 AND LOWER(syllabus) = $1 AND semester = $2",
            [syllabus, semester, temp_mark_5_arr[0], temp_mark_5_arr[1]]
          );
        }

        for (let i = 0; i < all_mark_5_questions.rows.length; i++) {
          all_mark_5_arr = all_mark_5_arr.concat(
            Object.values(all_mark_5_questions.rows[i])
          );
        }

        console.log("5 all:", all_mark_5_arr);

        //randomly select two questions out of all selected
        for (let i = 0; i < 2; i++) {
          let rand_index = Math.floor(Math.random() * all_mark_5_arr.length);
          temp_mark_5_arr = temp_mark_5_arr.concat(all_mark_5_arr[rand_index]);
          all_mark_5_arr.splice(rand_index, 1);
        }

        // generated_mark_5_and_5_arr = temp_mark_5_arr;

        // console.log("5 generated:", generated_mark_5_and_5_arr);

        let str =
          "(a). " +
          temp_mark_5_arr[0] +
          "(5M); (b). " +
          temp_mark_5_arr[1] +
          "(5M)";

        generated_mark_5_and_5_arr = generated_mark_5_and_5_arr.concat(str);
        console.log("5 generated:", generated_mark_5_and_5_arr);
      }
    }

    //--------------------------------------------------------------------------------------------------------------------------------
    GENERATED_MARK_2_QUESTIONS =
      GENERATED_MARK_2_QUESTIONS.concat(generated_mark_2_arr);

    console.log("2 mark questions:", GENERATED_MARK_2_QUESTIONS);

    GENERATED_MARK_6_QUESTIONS = GENERATED_MARK_6_QUESTIONS.concat(
      generated_priority_3_mark_6_arr
    );

    GENERATED_MARK_6_QUESTIONS = GENERATED_MARK_6_QUESTIONS.concat(
      generated_priority_1_mark_6_arr
    );

    GENERATED_MARK_6_QUESTIONS =
      GENERATED_MARK_6_QUESTIONS.concat(generated_mark_6_arr);

    if (generated_mark_4_and_2_arr.length != 0) {
      GENERATED_MARK_6_QUESTIONS = GENERATED_MARK_6_QUESTIONS.concat(
        "(a). " +
          generated_mark_4_and_2_arr[0] +
          "(4M); (b). " +
          generated_mark_4_and_2_arr[1] +
          "(2M)"
      );
    }

    if (generated_mark_3_and_3_arr.length != 0) {
      GENERATED_MARK_6_QUESTIONS = GENERATED_MARK_6_QUESTIONS.concat(
        "(a). " +
          generated_mark_3_and_3_arr[0] +
          "(3M); (b). " +
          generated_mark_3_and_3_arr[1] +
          "(3M)"
      );
    }

    if (generated_mark_2_and_2_and_2_arr.length != 0) {
      GENERATED_MARK_6_QUESTIONS = GENERATED_MARK_6_QUESTIONS.concat(
        "(a). " +
          generated_mark_2_and_2_and_2_arr[0] +
          "(2M); (b). " +
          generated_mark_2_and_2_and_2_arr[1] +
          "(2M); (c)" +
          generated_mark_2_and_2_and_2_arr[2] +
          "(2M)"
      );
    }

    console.log("6 mark questions:", GENERATED_MARK_6_QUESTIONS);

    GENERATED_MARK_10_QUESTIONS = GENERATED_MARK_10_QUESTIONS.concat(
      generated_all_mark_10_arr
    );

    GENERATED_MARK_10_QUESTIONS = GENERATED_MARK_10_QUESTIONS.concat(
      generated_mark_5_and_5_arr
    );

    console.log("10 mark questions:", GENERATED_MARK_10_QUESTIONS);
    //-----------------------------------------------------------------------------------------------------------------------------------

    return res.render("teacher_page.ejs", {
      user: req.user.name,
      path: req.url,
      generator_mark_2_data: GENERATED_MARK_2_QUESTIONS,
      generator_mark_6_data: GENERATED_MARK_6_QUESTIONS,
      generator_mark_10_data: GENERATED_MARK_10_QUESTIONS,
    });
  } catch (err) {
    console.error(err.message);
  }
};
