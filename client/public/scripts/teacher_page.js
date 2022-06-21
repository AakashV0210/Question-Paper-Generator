function toggleText1() {
  let text1 = document.getElementById("viewer");
  let text2 = document.getElementById("generator");
  let text3 = document.getElementById("add");
  text1.style.display = "none";
  text2.style.display = "none";
  text3.style.display = "none";

  if (text1.style.display === "none") {
    text1.style.display = "block";
  }
}

function toggleText2() {
  let text1 = document.getElementById("viewer");
  let text2 = document.getElementById("generator");
  let text3 = document.getElementById("add");
  text1.style.display = "none";
  text2.style.display = "none";
  text3.style.display = "none";


  if (text2.style.display === "none") {
    text2.style.display = "block";
  }
}

function toggleText3() {
  let text1 = document.getElementById("viewer");
  let text2 = document.getElementById("generator");
  let text3 = document.getElementById("add");

  text1.style.display = "none";
  text2.style.display = "none";
  text3.style.display = "none";


  if (text3.style.display === "none") {
    text3.style.display = "block";
  }
}





let filter,
  filter_val = undefined;
function select_syllabus() {
  var radiobutton = document.getElementsByName("filter");
  document.getElementById("filter_button").style.display = "none";
  document.getElementById("syllabus").style.display = "none";
  document.getElementById("semester").style.display = "none";
  document.getElementById("search_box").style.display = "none";
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
  document.getElementById("search_box").style.display = "none";
  document.getElementById("semester").style.display = "block";
  for (let i = 0; i < radiobutton.length; i++) {
    if (radiobutton[i].checked) {
      filter = radiobutton[i].value;
      // console.log(filter);
    }
  }
}

function display_search_box() {
  var radiobutton = document.getElementsByName("filter");
  document.getElementById("filter_button").style.display = "none";
  document.getElementById("syllabus").style.display = "none";
  document.getElementById("semester").style.display = "none";
  document.getElementById("syllabus").style.display = "none";
  document.getElementById("search_box").style.display = "block";
  for (let i = 0; i < radiobutton.length; i++) {
    if (radiobutton[i].checked) {
      filter = radiobutton[i].value;
    }
  }
}

function display_filter_button() {
  var radiobutton = document.getElementsByName(filter);

  document.getElementById("filter_button").style.display = "block";

  for (let i = 0; i < radiobutton.length; i++) {
    if (radiobutton[i].checked) {
      filter_val = radiobutton[i].value;
    }
  }

  const path = "/teacher_page/view-questions/" + filter + "/" + filter_val;
  console.log(path);
  document.getElementById("filtered_questions").textContent = path;
  document.getElementById("filtered_questions").setAttribute("href", path);
}

function search_item() {
  filter_val = document.getElementById("filter_input").value;
  console.log(filter);
  console.log(filter_val);

  if (filter_val == undefined) {
    document.write("Enter a valid search");
  } else {
    const path = "/teacher_page/view-questions/" + filter + "/" + filter_val;
    document.getElementById("filter_button").style.display = "block";
    console.log;
    document.getElementById("filtered_questions").textContent = path;
    document.getElementById("filtered_questions").setAttribute("href", path);
  }
}

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
