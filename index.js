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
    accountInput.value = "";
    amountInput.value = "";
    descInput.value = "";
    modal.style.display = "block"
})

let closeBtn = document.getElementById("closeBtn");
closeBtn.addEventListener("click", function(){
    modal.style.display = "none"
})

// send money button
let historyArr = JSON.parse(localStorage.getItem("sendInfo")) || []
let bal = document.querySelector(".bal");
let accountInput = document.getElementById("accountInput");
let amountInput = document.getElementById("amountInput");
let descInput = document.getElementById("descInput")
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
        let sendInfo = {
            amount: `${amount}`,
            receiverAcc: `${receiverAcc.username}`,
            description: descInput.value,
            sendersAmt: `-${amount}`,
            sendersAcc:  `${currentUser}`
        }
       historyArr.push(sendInfo)
     console.log(historyArr);

        currentUserInfo.accountBalance -= amount;
        receiverAcc.accountBalance += amount
        localStorage.setItem("userInfo", JSON.stringify(gotten));
        localStorage.setItem("sendInfo", JSON.stringify(historyArr))
        console.log(amount, currentUserInfo.accountBalance, receiverAcc.accountBalance, receiverAcc, currentUser);
        alert("Transaction successful 🎉")
        console.log("Trans successful");
        modal.style.display = "none"
    } else if(currentUserInfo.accountBalance < amount){
        alert("Insufficient funds ❌")
          modal.style.display = "none"
        console.log("Insufficient funds");
        
    } else{
        console.log("failed");
    }
    generate()
    location.reload()
});

// transfer button
let transBtn = document.getElementById("transBtn");
let screen = document.getElementById("show");
let ccHistory = document.querySelector(".ccHistory");
let accountInfoDiv = document.querySelector(".accountInfoDiv");
let topDiv = document.querySelector(".topDiv");
let transactionSec = document.querySelector(".transaction");

let historyGotten = JSON.parse(localStorage.getItem("sendInfo"));
transBtn.addEventListener("click", function(){
    screen.innerHTML = `<h2>Transactions</h2>`
    let depositsArr = [];
    let withdrawalArr = [];
    historyGotten.forEach(element => {
        if(element.sendersAcc === currentUser){
            withdrawalArr.push(element);
            // console.log(withdrawalArr);
        } else if(element.receiverAcc === currentUser){
            depositsArr.push(element);
            // console.log(depositsArr);
        } 
        let transactionsArr = [...depositsArr, ...withdrawalArr];
        // console.log(transactionsArr);
        transactionsArr.forEach(element => {
            let typeColor = document.createElement("typeDiv");
            typeColor.classList.add("type-color");
            let deposits = (element.receiverAcc === currentUser);
            if (deposits){
               typeColor.classList.add("type-color-deposit");
            } else{
                typeColor.classList.add("type-color-withdrawal");
            }
            // console.log(deposits);
            screen.innerHTML += `<div class="transaction">
            <div class="tra">
            ${typeColor.outerHTML}
             <div>
            <p>${element.description}</p>
            <span>4:20</span>
            </div>
            </div>
            <span class="amount">$ ${element.amount}</span>
            </div> `
        ccHistory.style.display = "none"
        accountInfoDiv.style.display = "none"
        topDiv.style.display = "none";
        });
    });
     
})


// home button
let homeBtn = document.getElementById("homeBtn");
homeBtn.addEventListener("click", function(){ 
   screen.style.display = "none"
    ccHistory.style.display = "block"
    location.reload();
})