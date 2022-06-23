let generator_semester_value, generator_syllabus_value;

function display_generate_semester() {
  var syllabus_radio_button = document.getElementsByName("generator_syllabus");
  for (let i = 0; i < syllabus_radio_button.length; i++) {
    if (syllabus_radio_button[i].checked) {
      generator_syllabus_value = syllabus_radio_button[i].value;
      document.getElementById("question_generator_semester").style.display =
        "block";
    }
  }
}

function display_generate_button() {
  var semester_radio_button = document.getElementsByName("generator_semester");
  for (let i = 0; i < semester_radio_button.length; i++) {
    if (semester_radio_button[i].checked) {
      generator_semester_value = semester_radio_button[i].value;
      document.getElementById("generate_button").style.display = "block";
      break;
    }
  }
  console.log(generator_syllabus_value);
  console.log(generator_semester_value);

  const path =
    "/teacher_page/generate-questions/" +
    generator_syllabus_value +
    "/" +
    generator_semester_value;
  document.getElementById("generate_question_paper").textContent = path;
  document.getElementById("generate_question_paper").setAttribute("href", path);
}
