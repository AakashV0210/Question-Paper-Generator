function toggleText1() {
  let text1 = document.getElementById("viewer");
  // document
  //   .getElementById("view")
  //   .setAttribute("href", "/teacher_page/view-questions");

  if (text1.style.display === "none") {
    text1.style.display = "block";
  }
}
let filter,
  filter_val = undefined;
function select_syllabus() {
  var radiobutton = document.getElementsByName("filter");
  document.getElementById("filter_button").style.display = "none";
  document.getElementById("syllabus").style.display = "none";
  document.getElementById("semester").style.display = "none";
  document.getElementById("syllabus").style.display = "block";
  for (let i = 0; i < radiobutton.length; i++) {
    if (radiobutton[i].checked) {
      filter = radiobutton[i].value;
      console.log(filter);
    }
  }
}

function select_semester() {
  var radiobutton = document.getElementsByName("filter");
  document.getElementById("filter_button").style.display = "none";
  document.getElementById("syllabus").style.display = "none";
  document.getElementById("semester").style.display = "none";
  document.getElementById("semester").style.display = "block";
  for (let i = 0; i < radiobutton.length; i++) {
    if (radiobutton[i].checked) {
      filter = radiobutton[i].value;
      console.log(filter);
    }
  }
}

function display_button() {
  var radiobutton = document.getElementsByName(filter);

  document.getElementById("filter_button").style.display = "block";

  for (let i = 0; i < radiobutton.length; i++) {
    if (radiobutton[i].checked) {
      filter_val = radiobutton[i].value;
    }
  }

  // console.log(filter_val);
  const path = "/teacher_page/view-questions/" + filter + "/" + filter_val;
  console.log(path);
  document.getElementById("filtered_questions").textContent = path;
  document.getElementById("filtered_questions").setAttribute("href", path);
}
