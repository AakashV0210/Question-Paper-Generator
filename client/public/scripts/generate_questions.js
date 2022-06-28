let generator_semester_value,
  generator_syllabus_value,
  generator_paper_value = undefined;

function display_generate_semester_form() {
  document.getElementById("question_generator_semester").style.display = "none";

  document.getElementById("question_generator_paper_selection").style.display =
    "none";

  var semester_radio_button = document.getElementsByName("generator_semester");

  //uncheck semester radiobuttons on load
  for (let i = 0; i < semester_radio_button.length; i++) {
    if (semester_radio_button[i].checked) {
      semester_radio_button[i].checked = false;
    }
  }

  var syllabus_radio_button = document.getElementsByName("generator_syllabus");
  for (let i = 0; i < syllabus_radio_button.length; i++) {
    if (syllabus_radio_button[i].checked) {
      generator_syllabus_value = syllabus_radio_button[i].value;
      document.getElementById("question_generator_semester").style.display =
        "block";
    }
  }
}

function remove_paper_selection() {
  document.getElementById("question_generator_paper_selection").style.display =
    "none";
}

function display_paper_selection() {
  document.getElementById("question_generator_paper_selection").style.display =
    "block";
}

function validate_question_generate() {
  let count_sem = 0;
  let count_paper = 0;

  var semester_radio_button = document.getElementsByName("generator_semester");

  for (let i = 0; i < semester_radio_button.length; i++) {
    if (semester_radio_button[i].checked) {
      generator_semester_value = semester_radio_button[i].value;
      count_sem++;
    }
  }

  if (generator_semester_value == 5 || generator_semester_value == 6) {
    var paper_radio_button = document.getElementsByName("paper_selector");
    for (let i = 0; i < paper_radio_button.length; i++) {
      if (paper_radio_button[i].checked) {
        generator_paper_value = paper_radio_button[i].value;
        count_paper++;
      }
    }

    if (count_paper == 1) {
      display_generated_questions();
    } else {
      alert("You must select something!");
      return false;
    }
  } else {
    if (count_sem == 1) {
      display_generated_questions();
    } else {
      alert("You must select something!");
      return false;
    }
  }
}

function display_generated_questions() {
  const url = window.location.pathname;
  const page_name = url.split("/");
  console.log(generator_paper_value);

  if (generator_paper_value != undefined) {
    const path =
      "/" +
      page_name[1] +
      "/generate-questions/" +
      generator_syllabus_value +
      "/" +
      generator_semester_value +
      "/" +
      generator_paper_value;

    document.getElementById("generator_form").setAttribute("action", path);
  } else {
    const path =
      "/" +
      page_name[1] +
      "/generate-questions/" +
      generator_syllabus_value +
      "/" +
      generator_semester_value;

    document.getElementById("generator_form").setAttribute("action", path);
  }
}
