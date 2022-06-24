function toggleText1() {
  let text1 = document.getElementById("viewer");
  let text2 = document.getElementById("generator");
  text1.style.display = "none";
  text2.style.display = "none";

  if (text1.style.display === "none") {
    text1.style.display = "block";
  }
}

function toggleText2() {
  let text1 = document.getElementById("viewer");
  let text2 = document.getElementById("generator");
  text1.style.display = "none";
  text2.style.display = "none";

  if (text2.style.display === "none") {
    text2.style.display = "block";
  }
}
