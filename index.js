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
    let gotten = JSON.parse(localStorage.getItem("userInfo"))
    gotten.forEach(element => {
        num.textContent = `${element.accountNumber}`;
        bal.textContent = `${element.accountBalance}`
        cardnum.textContent = `${element.cardNumber}`
        expDate.textContent = `${element.cardExpire}`
    });
    // console. log(gotten);
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
        
        console.log(userInfo.firstName);
    // let gotten = JSON.parse(localStorage.getItem("userInfo"))
    // gotten.forEach((element)=>{
    //     console.log(element);
    //     if (hours < 12 ){
    //         showGreet.innerHTML = `Good morning, ${element.firstName}`
    //     } else if(hours > 12 && hours < 18) {
    //         showGreet.innerHTML = `Good afternoon, ${element.firstName}`
    //     } else {
    //         showGreet.innerHTML = `Good evening, ${element.firstName}`
    //     }
    // })  
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


// let bal = document.querySelector(".bal");
// let accountInput = document.getElementById("accountInput");
// let amountInput = document.getElementById("amountInput");
// let sendBtn = document.getElementById("sendBtn");
// let gotten = JSON.parse(localStorage.getItem("userInfo"));
// let loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));

// sendBtn.addEventListener("click", function(){
//     const amount = Number(amountInput.value);
//     const receiverAcc = gotten.find((element => element.username === accountInput.value))
//     let userBal;
//     let balance = gotten.forEach((element =>{
//         userBal = element.accountBalance
//     }))
//     let currentUser = gotten.find((element => element.username === loggedUser.username));

//     console.log(loggedUser);

    // if (receiverAcc && currentUser) {
    //     if (receiverAcc.username === currentUser.username) {
    //         console.log("Cannot send money to self");
    //     } else if (amount > 0 && currentUser.accountBalance >= amount) {
    //         // Update account balances
    //         receiverAcc.accountBalance += amount;
    //         currentUser.accountBalance -= amount;
    //         localStorage.setItem("userInfo", JSON.stringify(gotten));
    //         console.log("Transaction successful!");
    //     } else {
    //         console.log("Invalid transaction");
    //     }
    // } else {
    //     console.log("Invalid user input");
    // }
//     console.log(amount, receiverAcc, userBal, currentUser);
// });
