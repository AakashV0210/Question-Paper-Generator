let filter,
  filter_val = undefined;

//selecting the syllabus radiobutton
function select_syllabus() {
  var radiobutton = document.getElementsByName("filter");
  // document.getElementById("filter_button").style.display = "none";
  document.getElementById("syllabus").style.display = "none";
  document.getElementById("semester").style.display = "none";
  document.getElementById("search_box").style.display = "none";

  var syllabus_radio_button = document.getElementsByName("syllabus");

  //uncheck semester radiobuttons on load
  for (let i = 0; i < syllabus_radio_button.length; i++) {
    if (syllabus_radio_button[i].checked) {
      syllabus_radio_button[i].checked = false;
    }
  }

  for (let i = 0; i < radiobutton.length; i++) {
    if (radiobutton[i].checked) {
      filter = radiobutton[i].value;
      document.getElementById("syllabus").style.display = "block";
      // console.log(filter);
    }
  }
}

//selecting the semester radiobutton
function select_semester() {
  var radiobutton = document.getElementsByName("filter");
  // document.getElementById("filter_button").style.display = "none";
  document.getElementById("syllabus").style.display = "none";
  document.getElementById("semester").style.display = "none";
  document.getElementById("search_box").style.display = "none";

  var semester_radio_button = document.getElementsByName("semester");

  //uncheck semester radiobuttons on load
  for (let i = 0; i < semester_radio_button.length; i++) {
    if (semester_radio_button[i].checked) {
      semester_radio_button[i].checked = false;
    }
  }

  for (let i = 0; i < radiobutton.length; i++) {
    if (radiobutton[i].checked) {
      filter = radiobutton[i].value;
      document.getElementById("semester").style.display = "block";
      // console.log(filter);
    }
  }
}

//checking if the syllabus or radiobutton values are selected before submitting

function validate_syllabus_and_semester() {
  let count = 0;

  var radiobutton = document.getElementsByName(filter);

  for (let i = 0; i < radiobutton.length; i++) {
    if (radiobutton[i].checked) {
      filter_val = radiobutton[i].value;
      count++;
    }
  }

  if (count == 1) {
    view_questions_with_filter();
    // console.log("a");
  } else {
    alert("You must select something!");
    return false;
  }
}

//displaying the search box
function display_search_box() {
  var radiobutton = document.getElementsByName("filter");
  // document.getElementById("filter_button").style.display = "none";
  document.getElementById("syllabus").style.display = "none";
  document.getElementById("semester").style.display = "none";
  document.getElementById("search_box").style.display = "none";
  for (let i = 0; i < radiobutton.length; i++) {
    if (radiobutton[i].checked) {
      filter = radiobutton[i].value;
      document.getElementById("search_box").style.display = "block";
    }
  }
}

//checking if the search box is empty when submitting
function validate_chapter_and_question() {
  let search_input = document.getElementById("search_input").value.trim();
  if (search_input === "") {
    alert("Cannot have empty fields");
    return false;
  } else {
    filter_val = search_input;
    view_questions_with_filter();
  }
}

//displaying the filtered questions
function view_questions_with_filter() {
  const url = window.location.pathname;
  // console.log(url);
  const page_name = url.split("/");
  // console.log(page_name);
  // console.log(page_name[1]);
  // console.log("a");

  const path =
    "/" + page_name[1] + "/view-questions/" + filter + "/" + filter_val;

  if (filter === "chapter" || filter === "question") {
    document.getElementById("search_form").setAttribute("action", path);
  } else {
    let id = filter + "_form";
    // console.log(id);
    document.getElementById(id).setAttribute("action", path);
  }
}
