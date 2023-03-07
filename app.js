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
let userArr = JSON.parse(localStorage.getItem("userInfo"))

createBtn.addEventListener("click", function(){
if(fName.value == "" || lName.value == "" || username.value == "" || email.value == "" || 
password1.value == "" || password2.value == ""){
  alert("Enter your details.")
} else if (password1.value !== password2.value){
  alert("Passwords does not match.")
} else{
      // Gen acc number
  let accountNum = Math.floor(10000000 + Math.random() * 9000000000)
  let initBalance = 2500.00
  let randcreditNum = Math.floor(Math.random()*10000000000000000).toString().padStart(16,"0");
  let expMonth = Math.floor(Math.random()*12);
  let expYear = 24
  let expiryDate = `${expMonth}/${expYear}`
  // let creditNum = randcreditNum.toString();
  console.log(randcreditNum, expMonth);

  let userInfo = {
    firstName: fName.value,
    lastName: lName.value,
    username: username.value,
    email: email.value,
    password: password1.value,
    accountNumber: accountNum,
    accountBalance: initBalance,
    cardNumber: randcreditNum,
    cardExpire: expiryDate,
  }
  let userKey = `userInfo-${username.value}`;
  if(userArr == null){
    userArr = []
    userArr.push(userInfo);
    localStorage.setItem("userInfo", JSON.stringify(userArr))
    localStorage.setItem(userKey, JSON.stringify(userInfo));
    signUpDiv.style.display = "none";
    loginDiv.style.display = "block";
  } else {
    userArr.push(userInfo);
    localStorage.setItem("userInfo", JSON.stringify(userArr))
    localStorage.setItem(userKey, JSON.stringify(userInfo));
    signUpDiv.style.display = "none";
    loginDiv.style.display = "block";
  }
}
})
// LOGIN ACCOUNT

let loginBtn = document.getElementById("loginBtn");
let usernameLog = document.getElementById("usernameLog");
let passwordLog = document.getElementById("passwordLog");

loginBtn.addEventListener("click", function(){
  // Retrieve the user's information using the key
let userKey = `userInfo-${usernameLog.value}`;
  // Get the user's key from localStorage
  let userInfo = JSON.parse(localStorage.getItem(userKey));

if (userInfo && userInfo.password === passwordLog.value) {
  localStorage.setItem("loggedInUser", usernameLog.value);
  loginDiv.style.display = "none";
  window.location.href = "index.html";
} else {
  alert("Invalid username or password");
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