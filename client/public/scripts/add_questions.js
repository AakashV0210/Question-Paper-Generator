function validate_question_add() {
  console.log("a");

  var regex = /^[A-Za-z0-9 ]+$/;

  const syllabus = document
    .getElementById("add_syllabus")
    .value.trim()
    .replaceAll(" ", "");
  const semester = document.getElementById("add_semester").value.trim();
  const chapter = document
    .getElementById("add_chapter")
    .value.trim()
    .replaceAll(" ", "");
  const unit = document.getElementById("add_unit").value.trim();
  const marks = document.getElementById("add_marks").value.trim();
  const priority = document.getElementById("add_priority").value.trim();
  const question = document.getElementById("add_question").value.trim();

  var is_valid1 = regex.test(syllabus);
  var is_valid2 = regex.test(chapter);
  var is_valid3 = regex.test(question);

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
  } else if (!is_valid1 || !is_valid2 || !is_valid3) {
    alert("Cannot have special characters");
    return false;
  } else {
    submit_add();
    // console.log("b");
  }
}

function submit_add() {
  const syllabus = document
    .getElementById("add_syllabus")
    .value.trim()
    .replaceAll(" ", "");
  const semester = document.getElementById("add_semester").value.trim();
  const chapter = document
    .getElementById("add_chapter")
    .value.trim()
    .replaceAll(" ", "");
  const unit = document.getElementById("add_unit").value.trim();
  const marks = document.getElementById("add_marks").value.trim();
  const priority = document.getElementById("add_priority").value.trim();
  const question = document.getElementById("add_question").value.trim();

  path =
    "/teacher_page/add-entry/" +
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

  document.getElementById("submit_add").setAttribute("action", path);
}
