function validate_question_add() {
  console.log("a");
  const syllabus = document
    .getElementById("add_syllabus")
    .value.trim()
    .replaceAll(" ", "");
  const semester = document.getElementById("add_semester").value.trim();
  const chapter = document.getElementById("add_chapter").value.trim();
  const unit = document.getElementById("add_unit").value.trim();
  const marks = document.getElementById("add_marks").value.trim();
  const priority = document.getElementById("add_priority").value.trim();
  const question = document.getElementById("add_question").value.trim();
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
  const chapter = document.getElementById("add_chapter").value.trim();
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
