// LANDING PAGE

let beginBtn = document.getElementById("beginBtn");
let signUpDiv = document.querySelector(".signUpDiv");
let landing = document.querySelector(".landing");

beginBtn.addEventListener("click", function(){
  signUpDiv.style.display = "block"
  landing.style.display = "none"
})

// CREATE ACCOUNT

let createBtn = document.getElementById("createBtn");
let loginDiv = document.querySelector(".loginDiv");
let fName = document.getElementById("fName");
let lName = document.getElementById("lName");
let username = document.getElementById("username");
let email = document.getElementById("email");
let password1 = document.getElementById("password1");
let password2 = document.getElementById("password2");


createBtn.addEventListener("click", function(){
if(fName.value == "" || lName.value == "" || username.value == "" || email.value == "" || 
password1.value == "" || password2.value == ""){
  alert("Enter your details.")
} else if (password1.value !== password2.value){
  alert("Passwords does not match.")
} else{
  let userInfo = {
    firstName: fName.value,
    lastName: lName.value,
    username: username.value,
    email: email.value,
    password: password1.value
  }
  let userArr = JSON.parse(localStorage.getItem("userInfo")) || []
  userArr.push(userInfo);
  localStorage.setItem("userInfo", JSON.stringify(userArr));
  // console.log(userArr);
  signUpDiv.style.display = "none";
  loginDiv.style.display = "block";
}
})

// VISIBILITY FOR SIGN UP
let visibilityBtn = document.querySelector(".visibilityDiv");
visibilityBtn.addEventListener("click", function(){
  if(password1.type == "password" && password2.type == "password"){
    password1.type = "text"
    password2.type = "text"
    visibilityBtn.innerHTML = `<span class="material-symbols-outlined">
    visibility
    </span>`
  } else {
    password1.type = "password"
    password2.type = "password"
    visibilityBtn.innerHTML =  `<span class="material-symbols-outlined">
    visibility_off
    </span>`
  }
})

// LOGIN ACCOUNT

let loginBtn = document.getElementById("loginBtn");
let usernameLog = document.getElementById("usernameLog");
let passwordLog = document.getElementById("passwordLog");
let gotten = JSON.parse(localStorage.getItem("userInfo"));
loginBtn.addEventListener("click", function(){
  const found = gotten.find((element)=> element.username == usernameLog.value && element.password == passwordLog.value )
  // console.log(gotten);
  if(found){
    alert("Loggin in.")
    loginDiv.style.display = "none";
    window.location.href = "index.html"
  } else{
    alert("User not found.")
  }
})

// VISIBILITY FOR LOG IN
let visibilityDivBtn = document.querySelector(".visibilityDivBtn");
visibilityDivBtn.addEventListener("click", function(){
  if(passwordLog.type == "password"){
    passwordLog.type = "text"
    visibilityDivBtn.innerHTML = `<span class="material-symbols-outlined">
    visibility
    </span>`
  } else {
    passwordLog.type = "password"
    visibilityDivBtn.innerHTML = `<span class="material-symbols-outlined">
    visibility_off
    </span>`
  }
})

// ALREADY HAVE AN ACCOUNT
let logHereBtn = document.getElementById("logHere");
logHereBtn.addEventListener("click", function(){
  signUpDiv.style.display = "none";
  loginDiv.style.display = "block";
})

let signHereBtn = document.getElementById("signHere");
signHereBtn.addEventListener("click", function(){
  signUpDiv.style.display = "block";
  loginDiv.style.display = "none";
}) 