function toggleText1() {
  let text1 = document.getElementById("viewer");
  document
    .getElementById("view")
    .setAttribute("href", "/teacher_page/view-questions");

  if (text1.style.display === "none") {
    text1.style.display = "block";
  }
}
