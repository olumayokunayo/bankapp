// Check if user is active or log out.
function checkUser(){
    let currentUser = JSON.parse(localStorage.getItem("userInfo"))
    if(!currentUser){
        window.location.href = "signup.html";
    }
}
checkUser()

// Generate account NUMBER AND BALANCE.
function generate(){
    let bal = document.querySelector(".bal");
    let num = document.querySelector(".num");
    let expDate = document.querySelector(".expDate");
    let cardnum = document.querySelector(".cardnum");
    let gotten = JSON.parse(localStorage.getItem("userInfo"));
    let currentUser = localStorage.getItem("loggedInUser")
    let currentUserInfo = gotten.find((element => element.username === currentUser))
    if(currentUserInfo){
        num.textContent = `${currentUserInfo.accountNumber}`;
        bal.textContent = `${currentUserInfo.accountBalance}`
        cardnum.textContent = `${currentUserInfo.cardNumber}`
        expDate.textContent = `${currentUserInfo.cardExpire}`
    }
}
generate()

// DATE AND GREETING

function getDate(){
    let showGreet = document.querySelector(".showGreet");
    let date = new Date();
    let hours = date.getHours()
    let loggedInUser = localStorage.getItem("loggedInUser");
    let userKey = `userInfo-${loggedInUser}`;

// Retrieve the user's information using the key
let userInfo = JSON.parse(localStorage.getItem(userKey));

// Use the user's information as needed

        if (hours < 12 ){
            showGreet.innerHTML = `Good morning, ${userInfo.firstName}`
        } else if(hours > 12 && hours < 18) {
            showGreet.innerHTML = `Good afternoon, ${userInfo.firstName}`
        } else {
            showGreet.innerHTML = `Good evening, ${userInfo.firstName}`
        }  
        // console.log(userInfo.firstName); 
}
getDate()

// modal

let transferBtn = document.getElementById("transferBtn")
let modal = document.querySelector(".modal")
transferBtn.addEventListener("click", function(){
    modal.style.display = "block"
})

let closeBtn = document.getElementById("closeBtn");
closeBtn.addEventListener("click", function(){
    modal.style.display = "none"
})

// send money

let bal = document.querySelector(".bal");
let accountInput = document.getElementById("accountInput");
let amountInput = document.getElementById("amountInput");
let sendBtn = document.getElementById("sendBtn");
let gotten = JSON.parse(localStorage.getItem("userInfo"));
let currentUser = localStorage.getItem("loggedInUser")

sendBtn.addEventListener("click", function(){
    const amount = Number(amountInput.value);
    const receiverAcc = gotten.find((element => element.username === accountInput.value))
    let currentUserInfo = gotten.find((element => element.username === currentUser))
    if(receiverAcc.username === currentUser){
        console.log("You can't send to self");
    } else if(amount > 0 && currentUserInfo.accountBalance >= amount){
        currentUserInfo.accountBalance -= amount;
        receiverAcc.accountBalance += amount
        localStorage.setItem("userInfo", JSON.stringify(gotten));
        console.log(amount, currentUserInfo.accountBalance, receiverAcc.accountBalance, receiverAcc);
        console.log("Trans successful");
        modal.style.display = "none"
    } else if(currentUserInfo.accountBalance < amount){
        console.log("Insufficient funds");
        
    } else{
        console.log("failed");
    }
    generate()
});
