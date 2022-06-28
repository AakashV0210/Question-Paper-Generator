function validate_question_edit() {
  var regex = /^[A-Za-z0-9 ]+$/;

  const id = document.getElementById("edit_id").textContent;
  const syllabus = document
    .getElementById("edit_syllabus")
    .value.trim()
    .replaceAll(" ", "");
  const semester = document.getElementById("edit_semester").value.trim();
  const chapter = document
    .getElementById("edit_chapter")
    .value.trim()
    .replaceAll(" ", "");
  const unit = document.getElementById("edit_unit").value.trim();
  const marks = document.getElementById("edit_marks").value.trim();
  const priority = document.getElementById("edit_priority").value.trim();
  const question = document.getElementById("edit_question").value.trim();

  var is_valid1 = regex.test(syllabus);
  var is_valid2 = regex.test(chapter);
  // var is_valid3 = regex.test(question);

  if (
    syllabus === "" ||
    semester === "" ||
    chapter === "" ||
    unit === "" ||
    marks === "" ||
    priority === "" ||
    question === ""
  ) {
    alert("Cannot have empty fields");
    return false;
  } else if (marks == 7 || marks == 8 || marks == 9) {
    alert("You can only enter 2, 3, 4, 5, 6 and 10 mark questions");
    return false;
  } else if (!is_valid1 || !is_valid2) {
    alert("Cannot have special characters");
    return false;
  } else {
    submit_edit();
  }
}

function submit_edit() {
  const id = document.getElementById("edit_id").textContent;
  const syllabus = document
    .getElementById("edit_syllabus")
    .value.trim()
    .replaceAll(" ", "");
  const semester = document.getElementById("edit_semester").value.trim();
  const chapter = document
    .getElementById("edit_chapter")
    .value.trim()
    .replaceAll(" ", "");
  const unit = document.getElementById("edit_unit").value.trim();
  const marks = document.getElementById("edit_marks").value.trim();
  const priority = document.getElementById("edit_priority").value.trim();
  const question = document.getElementById("edit_question").value.trim();

  path =
    "/teacher_page/edit-entry/" +
    id +
    "/" +
    syllabus +
    "/" +
    semester +
    "/" +
    chapter +
    "/" +
    unit +
    "/" +
    marks +
    "/" +
    priority +
    "/" +
    question;

  document.getElementById("submit_edit").setAttribute("action", path);
}
