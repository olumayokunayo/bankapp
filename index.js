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
        if (hours < 12 ){
            showGreet.innerHTML = `Good morning, ${userInfo.firstName}`
        } else if(hours >= 12 && hours <= 18) {
            showGreet.innerHTML = `Good afternoon, ${userInfo.firstName}`
        } else {
            showGreet.innerHTML = `Good evening, ${userInfo.firstName}`
        }  
        // console.log(userInfo.firstName); 
}
getDate()

// // modal
let accountInput = document.getElementById("accountInput");
let amountInput = document.getElementById("amountInput");
let descInput = document.getElementById("descInput")
let transferBtn = document.getElementById("transferBtn")
let modal = document.querySelector(".modal")
let balanceShow = document.querySelector(".balanceShow");
let screen = document.getElementById("show");


transferBtn.addEventListener("click", function(){
   screen.innerHTML = "";
    accountInput.value = "";
    amountInput.value = "";
    descInput.value = "";
   
    modal.style.display = "block"
    let currentUserInfo = gotten.find((element => element.username === currentUser))
    balanceShow.textContent = `$${currentUserInfo.accountBalance}`
    // ccHistory.style.display = "none"
    // accountInfoDiv.style.display = "none"
    // topDiv.style.display = "none";
    // bottomNav.style.display = "none";
})

let closeBtn = document.getElementById("closeBtn");
closeBtn.addEventListener("click", function(){
    modal.style.display = "none"
})

// // send money button

let historyArr = JSON.parse(localStorage.getItem("sendInfo")) || []
let bal = document.querySelector(".bal");
// let accountInput = document.getElementById("accountInput");
// let amountInput = document.getElementById("amountInput");
// let descInput = document.getElementById("descInput")
let sendpinInput = document.getElementById("sendpinInput");
let sendBtn = document.getElementById("sendBtn");
let gotten = JSON.parse(localStorage.getItem("userInfo"));
let currentUser = localStorage.getItem("loggedInUser")

sendBtn.addEventListener("click", function(){
    let date = new Date();
    let newDate = date.toLocaleDateString();
    let newTime =  date.toLocaleTimeString();
    let pin = sendpinInput.value;
    // let dateandtime = `${newDate} ${time}`
    console.log(newDate, newTime);
    const amount = Number(amountInput.value);
    // const receiverAcc = gotten.find((element => element.username === accountInput.value))
    const receiverAcc = gotten.find((element)=>{
        return element.accountNumber === Number(accountInput.value) || element.username === accountInput.value
    })
    console.log(receiverAcc);
    let currentUserInfo = gotten.find((element => element.username === currentUser))
    if(receiverAcc.username === currentUser){
        console.log("You can't send to self");
    } else if(amount > 0 && currentUserInfo.accountBalance >= amount && currentUserInfo.userpin === pin){
        let sendInfo = {
            amount: `${amount}`,
            receiverAcc: `${receiverAcc.username}`,
            description: descInput.value,
            sendersAmt: `-${amount}`,
            sendersAcc:  `${currentUser}`,
            date: `${newDate}`,
            time: `${newTime}`
        }
        historyArr.push(sendInfo)
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
     console.log(historyArr);
})

// // transfer button
let transBtn = document.getElementById("transBtn");

let ccHistory = document.querySelector(".ccHistory");
let accountInfoDiv = document.querySelector(".accountInfoDiv");
let topDiv = document.querySelector(".topDiv");
let bottomNav = document.querySelector(".bottomNav");
let transactionSec = document.querySelector(".transaction");

// //  transactions 

let historyGotten = JSON.parse(localStorage.getItem("sendInfo"));

transBtn.addEventListener("click", function(){
window.location.href = "trans.html"
     
})


// // home button
let homeBtn = document.getElementById("homeBtn");
homeBtn.addEventListener("click", function(){ 
   screen.style.display = "none"
    ccHistory.style.display = "block"
    location.reload();
})

// // history / summary

function history(){
    let transactionsDiv = document.querySelector(".transactionsDiv");
    let historyGotten = JSON.parse(localStorage.getItem("sendInfo"));
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
        transactionsDiv.innerHTML = `<h5 class="historyhead">History</h5>`
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
            transactionsDiv.innerHTML += `<div class="history">
            <div class="tra">
            ${typeColor.outerHTML}
             <div>
            <p class="transDesc">${element.description}</p>
            <div class="datediv">
            <span class="dandt">${element.date}</span>
            </div>
            </div>
            </div>

            <span class="amount"> ${deposits ? "+" : "-"} $ ${element.amount}</span>
            </div> `
        });
    });

}
history();

// //  profile
// // profile button


let profileBtn = document.getElementById("profileBtn");


profileBtn.addEventListener("click", function(){
    let currentUserInfo = gotten.find((element => element.username === currentUser))
  
    console.log(currentUserInfo.username);
    if(currentUserInfo){
    ccHistory.style.display = "none"
    accountInfoDiv.style.display = "none"
    topDiv.style.display = "none";

    screen.innerHTML += `
    <div class="profileContainer">
        <div class="profileDiv">
        <span onclick="profileBackBtn()" class="profileBack material-symbols-outlined">
        arrow_back</span>
        <div class="personDiv">
        <span class="personIcon material-symbols-outlined animate__animated animate__bounceIn">
        account_circle</span>
        <p class="name animate__animated animate__bounceInDown"></p>
        </div>
        <div class="settingDiv">
        <div class="set">
        <span class="profileIcon material-symbols-outlined">
        person
        </span>
        <span>Edit Profile</span>
        </div>
        <div class="set">
        <span class="material-symbols-outlined">
        account_balance
        </span>
        <span>Bank information</span>
        </div>
        <div class="set">
        <span class="profileIcon material-symbols-outlined">
        notifications
        </span>
        <span>Notifications</span>
        </div>
        <div class="set">
        <span class="profileIcon material-symbols-outlined">
        lock
        </span>
        <span>Password</span>
        </div>
        <div class="set">
        <span class="profileIcon material-symbols-outlined">
        policy
        </span>
        <span>Privacy</span>
        </div>
        <div class="set deactivate" onclick="deactivateBtn()">
        <span class="material-symbols-outlined">
        block
        </span>
        <span>Deactivate account</span>
        </div>
        
        <div onclick="logoutBtn()" class="set logOut">
        <span class="profileIcon material-symbols-outlined">
        logout
        </span>
        <span>Log out</span>
        </div>
        </div>
        </div>
        </div>
        <div  class="modal3">
        <div class="modalContent3">
                <div class="modal-3">
                <p class="confirmDeactivate">Are you sure you want to deactivate your account?</p>
                    <input type="text" id="deactivateInput" placeholder="Enter your username">
                    <input type="text" id="deactivatePassword" placeholder="Enter your password">
                    <button class="noBtn" onclick="deactivateNoBtn()">No</button>
                    <button class="yesBtn" onclick="deactivateYesBtn()">Yes</button>
                </div>
        </div>
    </div> 
        <div  class="modal2">
        <div class="modalOverlay2"></div>
        <div class="modalContent2">
        <p class="confirmLog">Are you sure you want to log out?</p>
            <div class="form">
               
                <div class="modal-footer2">
                    <button class="noBtn" onclick="noBtn()">No</button>
                    <button class="yesBtn" onclick="yesBtn()">Yes</button>
                </div>
        </div>
        </div>
    </div>
    `
    let profilename = document.querySelector(".name");
    profilename.textContent = ` Welcome, ${currentUserInfo.firstName}`


}
})

// // logout

function logoutBtn(){
    let modal2 = document.querySelector(".modal2");
    modal2.style.display = "block"
}

function noBtn(){
    let modal2 = document.querySelector(".modal2");
    modal2.style.display = "none"
}

function yesBtn(){
   window.location.href = "index.html";
}

function deactivateBtn(){
    let modal = document.querySelector(".modal-3");
    modal.style.display = "block"
}
function deactivateNoBtn(){
    let modal = document.querySelector(".modal-3");
    modal.style.display = "none";
 }

 function deactivateYesBtn(){
    let modal = document.querySelector(".modal-3");
    let deactivateInput = document.getElementById("deactivateInput");
    let deactivatePassword = document.getElementById("deactivatePassword");
    let currentUserInfo = gotten.find((element => element.username === currentUser))
    let retrieved = JSON.parse(localStorage.getItem("userInfo"));

    if(currentUserInfo.username === deactivateInput.value && currentUserInfo.password === deactivatePassword.value){
        const index = retrieved.findIndex( element => element.username === currentUserInfo.username)
        console.log(index);
        retrieved.splice(index, 1);
       localStorage.setItem("userInfo", JSON.stringify(retrieved))
        console.log(retrieved);
        modal.style.display = "none";
        window.location.href = "signup.html";
    }
   
 }

 // Check if user is active or log out.
function checkUser(){
    let currentUserInfo = gotten.find((element => element.username === currentUser))
    // console.log(currentUser);
    if(!currentUserInfo){
        window.location.href = "signup.html";
    }
}       
checkUser()


function profileBackBtn(){
let transactionsDiv = document.querySelector(".transactionsDiv");
location.reload()

// ccHistory.style.display = "block"
// accountInfoDiv.style.display = "block"

    screen.innerHTML = ""
    transactionsDiv.style.display = "none"
}

function visibilitybtn(){
    let visibilityOffIcon = document.querySelector(".visibilityOffIcon")
  let balance = document.querySelector(".bal");
  if(balance.style.visibility === "hidden"){
    balance.style.visibility = "visible";
    visibilityOffIcon.innerHTML = `<span class="material-symbols-outlined">
    visibility
    </span>`
  }else {
    balance.style.visibility = "hidden"
    visibilityOffIcon.innerHTML =  `<span class="material-symbols-outlined">
    visibility_off
    </span>`
  }
}

function copyBtn(){
    let num = document.querySelector(".num").innerText;
    navigator.clipboard.writeText(num)
    .then(()=>{
        alert("copied")
        console.log("Text copied to clipboard");
    })
    .catch(()=>{
        console.log("Error copying text");
    })
}

function closeBtnn(){
    let modal4 = document.querySelector(".modal4");  
    modal4.style.display = "none";
}

let modal4 = document.querySelector(".modal4");
let balanceShow2 = document.querySelector(".balanceShow2");
let airtimeBtn = document.getElementById("airtimeBtn");
airtimeBtn.addEventListener("click", function(){
    phoneInput.value = ""
    amountphoneInput.value = ""
    pinInput.value = ""
    modal4.style.display = "block";
    let currentUserInfo = gotten.find((element=> element.username === currentUser))
    balanceShow2.textContent =`$${currentUserInfo.accountBalance}`
    console.log(currentUserInfo.accountBalance);
})

// // buy airtime

let buyBtn = document.getElementById("buyBtn");
let phoneInput = document.getElementById("phoneInput");
let amountphoneInput = document.getElementById("amountphoneInput");
let pinInput = document.getElementById("pinInput");
let date = new Date();
let newDate = date.toLocaleDateString();
let newTime =  date.toLocaleTimeString();
buyBtn.addEventListener("click", function(){
    let amount = Number(amountphoneInput.value);
    let pin = pinInput.value;
    let currentUserInfo = gotten.find((element => element.username === currentUser));
    console.log(currentUserInfo.accountBalance);
    if (phoneInput.value.length >= 12){
        alert("Check number")
    } else if (amount > currentUserInfo.accountBalance){
        alert("Insufficient funds") 
    } else if (currentUserInfo.userpin !== pin){
        alert("Incorrect pin")
    } else{
        let airtimeInfo = {
            Number: phoneInput.value,
            Amount: `${amount}`,
            date: `${newDate}`,
            time: `${newTime}`

        }
        historyArr.push(airtimeInfo);
        currentUserInfo.accountBalance -= amount;
        console.log(currentUserInfo.accountBalance);
        localStorage.setItem("userInfo", JSON.stringify(gotten));
        localStorage.setItem("airtimeInfo", JSON.stringify(historyArr))
        alert("Successful✅")
        modal4.style.display = "none";
    }
    generate();
})
// visibility button
let balance = document.querySelector(".bal");
let visibilityBtn = document.getElementById("visibilityBtn");
visibilityBtn.addEventListener("click", function(){
   if(balance.style.visibility === "hidden"){
    balance.style.visibility = "visible";

    visibilityBtn.innerHTML = `  <span  id="visibilityBtn" class="visibilityOffIcon material-symbols-outlined">
    visibility
    </span>`
   } else {
    balance.style.visibility = "hidden"
    visibilityBtn.innerHTML =  `<span id="visibilityBtn"  class="visibilityOffIcon material-symbols-outlined">
    visibility_off
    </span>`
   }
})

// // transaction-home button

function homeBtnn(){
    screen.style.display = "none"
    ccHistory.style.display = "block"
    location.reload(); 
}



// let generateBtn = document.getElementById("generateBtn");
// generateBtn.addEventListener("click", function(){
//     let transactionsDiv = document.querySelector(".transactionsDiv");
//     let historyGotten = JSON.parse(localStorage.getItem("sendInfo"));
//     let depositsArr = [];
//     let withdrawalArr = [];
//     historyGotten.forEach(element => {
//         if(element.sendersAcc === currentUser){
//             withdrawalArr.push(element);
//             // console.log(withdrawalArr);
//         } else if(element.receiverAcc === currentUser){
//             depositsArr.push(element);
//             // console.log(depositsArr);
//         } 
//         transactionsDiv.innerHTML = `<h5 class="historyhead">History</h5>`
//         let transactionsArr = [...depositsArr, ...withdrawalArr];
//         // console.log(transactionsArr);
//         transactionsArr.forEach(element => {
//             let typeColor = document.createElement("typeDiv");
//             typeColor.classList.add("type-color");
//             let deposits = (element.receiverAcc === currentUser);
//             if (deposits){
//                typeColor.classList.add("type-color-deposit");
//             } else{
//                 typeColor.classList.add("type-color-withdrawal");
//             }
//             // console.log(deposits);
//             transactionsDiv.innerHTML += `<div class="history">
//             <div class="tra">
//             ${typeColor.outerHTML}
//              <div>
//             <p class="transDesc">${element.description}</p>
//             <div class="datediv">
//             <span class="dandt">${element.date}</span>
//             </div>
//             </div>
//             </div>

//             <span class="amount"> ${deposits ? "+" : "-"} $ ${element.amount}</span>
//             </div> `
//         });
//     });
// })

