function validate_question_edit() {
  const id = document.getElementById("edit_id").textContent;
  const syllabus = document.getElementById("edit_syllabus").value.trim();
  const semester = document.getElementById("edit_semester").value.trim();
  const chapter = document.getElementById("edit_chapter").value.trim();
  const unit = document.getElementById("edit_unit").value.trim();
  const marks = document.getElementById("edit_marks").value.trim();
  const priority = document.getElementById("edit_priority").value.trim();
  const question = document.getElementById("edit_question").value.trim();
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
  } else {
    submit_edit();
  }
}

function submit_edit() {
  const id = document.getElementById("edit_id").textContent;
  const syllabus = document.getElementById("edit_syllabus").value.trim();
  const semester = document.getElementById("edit_semester").value.trim();
  const chapter = document.getElementById("edit_chapter").value.trim();
  const unit = document.getElementById("edit_unit").value.trim();
  const marks = document.getElementById("edit_marks").value.trim();
  const priority = document.getElementById("edit_priority").value.trim();
  const question = document.getElementById("edit_question").value.trim();
  // if (
  //   syllabus === "" ||
  //   semester === "" ||
  //   chapter === "" ||
  //   unit === "" ||
  //   marks === "" ||
  //   priority === "" ||
  //   question === ""
  // ) {
  //   alert("Cannot have empty fields");
  // } else {
  path =
    "/teacher_page/edit-page/" +
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
  // }
}
