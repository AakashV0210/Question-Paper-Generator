let generator_semester_value, generator_syllabus_value;

function display_generate_semester_form() {
  document.getElementById("question_generator_semester").style.display = "none";

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

function validate_question_generate() {
  let count = 0;

  var semester_radio_button = document.getElementsByName("generator_semester");

  for (let i = 0; i < semester_radio_button.length; i++) {
    if (semester_radio_button[i].checked) {
      generator_semester_value = semester_radio_button[i].value;
      count++;
    }
  }

  if (count == 1) {
    display_generated_questions();
  } else {
    alert("You must select something!");
    return false;
  }
}

function display_generated_questions() {
  const path =
    "/teacher_page/generate-questions/" +
    generator_syllabus_value +
    "/" +
    generator_semester_value;

  document.getElementById("generator_form").setAttribute("action", path);
}
