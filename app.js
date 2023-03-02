let beginBtn = document.getElementById("beginBtn");
let signUpDiv = document.querySelector(".signUpDiv");
let landing = document.querySelector(".landing");

beginBtn.addEventListener("click", function(){
  signUpDiv.style.display = "block"
  landing.style.display = "none"
})

let createBtn = document.getElementById("createBtn");
let loginDiv = document.querySelector(".loginDiv");

createBtn.addEventListener("click", function(){
  signUpDiv.style.display = "none";
  loginDiv.style.display = "block";
})

