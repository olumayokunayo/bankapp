// GENERATE USER NUMBER AND BALANCE.
function generate() {
  let bal = document.querySelector(".bal");
  let num = document.querySelector(".num");
  let expDate = document.querySelector(".expDate");
  let cardnum = document.querySelector(".cardnum");
  let gotten = JSON.parse(localStorage.getItem("userInfo"));
  let currentUser = localStorage.getItem("loggedInUser");
  let currentUserInfo = gotten.find(
    (element) => element.username === currentUser
  );
  if (currentUserInfo) {
    num.textContent = `${currentUserInfo.accountNumber}`;
    bal.textContent = `${currentUserInfo.accountBalance}`;
    cardnum.textContent = `${currentUserInfo.cardNumber}`;
    expDate.textContent = `${currentUserInfo.cardExpire}`;
  }
}
generate();

// DATE AND GREETING

function getDate() {
  let showGreet = document.querySelector(".showGreet");
  let date = new Date();
  let hours = date.getHours();
  let loggedInUser = localStorage.getItem("loggedInUser");
  let userKey = `userInfo-${loggedInUser}`;

  // Retrieve the user's information using the key
  let userInfo = JSON.parse(localStorage.getItem(userKey));
  if (hours < 12) {
    showGreet.innerHTML = `Good morning, ${userInfo.firstName}`;
  } else if (hours >= 12 && hours <= 18) {
    showGreet.innerHTML = `Good afternoon, ${userInfo.firstName}`;
  } else {
    showGreet.innerHTML = `Good evening, ${userInfo.firstName}`;
  }
  // console.log(userInfo.firstName);
}
getDate();

// MODAL

let accountInput = document.getElementById("accountInput");
let amountInput = document.getElementById("amountInput");
let descInput = document.getElementById("descInput");
let transferBtn = document.getElementById("transferBtn");
let modal = document.querySelector(".modal");
let balanceShow = document.querySelector(".balanceShow");
let screen = document.getElementById("show");

// TRANSFER BUTTON MODAL

transferBtn.addEventListener("click", function () {
  screen.innerHTML = "";
  accountInput.value = "";
  amountInput.value = "";
  descInput.value = "";
  sendpinInput.value = "";
  modal.style.display = "block";
  let currentUserInfo = gotten.find(
    (element) => element.username === currentUser
  );
  balanceShow.textContent = `$${currentUserInfo.accountBalance}`;
});

// CLOSE BUTTON

let closeBtn = document.getElementById("closeBtn");
closeBtn.addEventListener("click", function () {
  modal.style.display = "none";
  location.reload();
});

// let timer;
// const logOutTimer = function (time) {
//   let counter = document.getElementById("counter");
//   let timeLeft = JSON.parse(localStorage.getItem("timeLeft"));

//   if (counter) {
//     // console.log(counter);
//     let time = timeLeft ? parseInt(timeLeft) : 300;

//       timer = setInterval(function () {
//       const min = String(Math.trunc(time / 60)).padStart(2, 0);
//       const sec = String(time % 60).padStart(2, 0);

//       counter.textContent = `${min}: ${sec}`;
//       time--;
//       localStorage.setItem("timeLeft", time.toString());
//       if (time === 0) {
//         clearInterval(timer);
//         localStorage.removeItem("timeLeft");
//         window.location.href = "index.html";
//       }
//     }, 1000);
//   } else {
//     console.log("Counter is null");
//   }
// };
// logOutTimer();

// SEND BUTTON

let historyArr = JSON.parse(localStorage.getItem("sendInfo")) || [];
let bal = document.querySelector(".bal");
let sendpinInput = document.getElementById("sendpinInput");
let sendBtn = document.getElementById("sendBtn");
let gotten = JSON.parse(localStorage.getItem("userInfo"));
let currentUser = localStorage.getItem("loggedInUser");
let traDiv = document.querySelector(".traDiv");
let amountInputError = document.querySelector(".amountInputError");
let accountInputError = document.querySelector(".accountInputError");
let descInputError = document.querySelector(".descInputError");
let passwordInputError = document.querySelector(".passwordInputError");

sendBtn.addEventListener("click", function () {
  let receiptDate = new Date();
  let newRecDate = receiptDate.toLocaleDateString();
  let newRecTime = receiptDate.toLocaleTimeString();
  let updatedDT = `${newRecDate} ${newRecTime}`;
  // console.log(newRecDate, newRecTime);

  amountInputError.textContent = "";
  accountInputError.textContent = "";
  // passwordInputError.textContent = ""
  descInputError.textContent = "";

  let accountValue = accountInput.value.trim();
  let amountValue = amountInput.value.trim();
  let descValue = descInput.value.trim();

  if (accountValue == "") {
    accountInputError.textContent = "Enter account number";
  }
  if (amountValue == "") {
    amountInputError.textContent = "Enter an amount";
  }
  if (descValue == "") {
    descInputError.textContent = "Enter a description";
  }
  let pin = sendpinInput.value;
  if (pin == "") {
    passwordInputError.textContent = "Enter your pin";
  }
  const amount = Number(amountInput.value);
  const receiverAcc = gotten.find((element) => {
    return (
      element.accountNumber === Number(accountInput.value) ||
      element.username === accountInput.value
    );
  });
  // console.log(receiverAcc);
  let currentUserInfo = gotten.find(
    (element) => element.username === currentUser
  );
  if (
    amount > 0 &&
    currentUserInfo.accountBalance >= amount &&
    currentUserInfo.userpin === pin
  ) {
    let sendInfo = {
      amount: `${amount}`,
      receiverAcc: `${receiverAcc.username}`,
      receiverfName: `${receiverAcc.firstName}`,
      receiverAcct: `${receiverAcc.accountNumber}`,
      description: descInput.value,
      sendersAmt: `-${amount}`,
      sendersAcc: `${currentUser}`,
      sendersName: `${currentUserInfo.firstName}`,
      newDate: `${updatedDT}`,
      date: new Date().getTime(),
      formattedDate: "",
    };
    console.log(newDate);
    const diffTime = Math.abs(new Date().getTime() - sendInfo.date);
    console.log(diffTime);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    console.log(diffDays);
    if (diffDays === 0) {
      sendInfo.formattedDate = `today`;
    } else if (diffDays === 1) {
      sendInfo.formattedDate = "yesterday";
    } else {
      sendInfo.formattedDate = `${diffDays} days ago`;
    }
    historyArr.push(sendInfo);
    currentUserInfo.accountBalance -= amount;
    receiverAcc.accountBalance += amount;
    localStorage.setItem("userInfo", JSON.stringify(gotten));
    localStorage.setItem("sendInfo", JSON.stringify(historyArr));
    // alert("Transaction successful 🎉");
    traDiv.style.display = "none";
    receiptDiv.style.display = "block";
    generate();
    // clearInterval(timer);
    // logOutTimer(500);
  } else if (currentUserInfo.accountBalance < amount) {
    alert("Insufficient funds ❌");
    console.log("Insufficient funds");
  } else {
    console.log("failed");
  }
});

// HISTORY

let transactionsDiv = document.querySelector(".transactionsDiv");
let historyGotten = JSON.parse(localStorage.getItem("sendInfo"));
let depositsArr = [];
let withdrawalArr = [];
if (historyGotten) {
  historyGotten.forEach((element) => {
    if (element.sendersAcc === currentUser) {
      withdrawalArr.push(element);
      // console.log(withdrawalArr);
    } else if (element.receiverAcc === currentUser) {
      depositsArr.push(element);
      // console.log(depositsArr);
    }
    transactionsDiv.innerHTML = `<h5 class="historyhead">History</h5>`;
    let transactionsArr = [...depositsArr, ...withdrawalArr];
    // console.log(transactionsArr);
    transactionsArr.forEach((element) => {
      let deposits = element.receiverAcc === currentUser;
      let amountColor = deposits ? "green" : "red";
      // console.log(deposits);
      transactionsDiv.innerHTML += `<div class="history">
      <div class="tra">
          <p class="transDesc">${element.description}</p>
          <span class="dandt">${element.formattedDate}</span> 
      </div>
      <div class="amount" style="color:${amountColor}">${
          deposits ? "+" : "-"
          } $ ${element.amount}</div>
  </div>`;
    });
  });
}

// RECEIPT

let receiptDiv = document.querySelector(".receiptDiv");
let receiptGotten = JSON.parse(localStorage.getItem("sendInfo"));
console.log(receiptGotten);
receiptDiv.innerHTML = "";
if (receiptGotten) {
  for (let i = 0; i < receiptGotten.length; i++) {
    receiptDiv.innerHTML = `
           <div class="receiptSec">
           <div class="successMsg">
           <h1>Transaction Successful </h1>
           </div>
        <h3>Receipt</h3>
        <section class="rect">
        <div class="recDiv">
        <p class="sender">ACCOUNT NUMBER</p>
        <p class="senderAmount">${receiptGotten[i].receiverAcct}</p>
        </div>
        <span class="receiptIcon material-symbols-outlined">check_circle</span>
        </section>
        <section class="rect">
        <div class="recDiv">
        <p class="sender">Recipient's Name</p>
        <p class="senderAmount">${receiptGotten[i].receiverfName}</p>
        </div>
        <span class="receiptIcon material-symbols-outlined">check_circle</span>
        </section>
        <section class="rect">
        <div class="recDiv">
        <p class="sender">Recipient's Bank</p>
        <p class="senderAmount">RAD BANK</p>
        </div>
        <span class="receiptIcon material-symbols-outlined">check_circle</span>
        </section>
        <section class="rect">
        <div class="recDiv">
        <p class="sender">Transaction Narration</p>
        <p class="senderAmount">${receiptGotten[i].description}</p>
        </div>
        <span class="receiptIcon material-symbols-outlined">check_circle</span>
        </section>
        <section class="rect">
        <div class="recDiv">
        <p class="sender">Amount Sent</p>
        <p class="senderAmount">${receiptGotten[i].amount}</p>
        </div>
        <span class="receiptIcon material-symbols-outlined">check_circle</span>
        </section>
        <section class="rect">
        <div class="recDiv">
        <p class="sender">Date</p>
        <p class="senderAmount">${receiptGotten[i].newDate}</p>
        </div>
        <span class="receiptIcon material-symbols-outlined">check_circle</span>
        </section>
        <div class="printBtn" onclick="downloadReceipt()">DOWNLOAD RECEIPT</div>
        </div>
        `;
  }
}

// DOWNLOAD RECEIPT

function downloadReceipt() {
  let receiptDiv = document.querySelector(".receiptSec");
  //  let printContents = receiptDiv.innerHTML;
  // let originalContents = document.body.innerHTML;
  // document.body.innerHTML = printContents;
  window.print();
  // document.body.innerHTML = originalContents;
}

// TRANSFER BUTTON

let transBtn = document.getElementById("transBtn");
let ccHistory = document.querySelector(".ccHistory");
let accountInfoDiv = document.querySelector(".accountInfoDiv");
let topDiv = document.querySelector(".topDiv");
let bottomNav = document.querySelector(".bottomNav");
let transactionSec = document.querySelector(".transaction");

// TRANSACTIONS PAGE

transBtn.addEventListener("click", function () {
  window.location.href = "trans.html";
});

// HOME BUTTON

let homeBtn = document.getElementById("homeBtn");
homeBtn.addEventListener("click", function () {
  screen.style.display = "none";
  ccHistory.style.display = "block";
  location.reload();
});

// LOGOUT

function logoutBtn() {
  let modal2 = document.querySelector(".modal2");
  modal2.style.display = "block";
}

function noBtn() {
  let modal2 = document.querySelector(".modal2");
  modal2.style.display = "none";
}

function yesBtn() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
}

function deactivateBtn() {
  let modal = document.querySelector(".modal-3");
  modal.style.display = "block";
}
function deactivateNoBtn() {
  let modal = document.querySelector(".modal-3");
  modal.style.display = "none";
}

function deactivateYesBtn() {
  let modal = document.querySelector(".modal-3");
  let deactivateInput = document.getElementById("deactivateInput");
  let deactivatePassword = document.getElementById("deactivatePassword");
  let currentUserInfo = gotten.find(
    (element) => element.username === currentUser
  );
  let retrieved = JSON.parse(localStorage.getItem("userInfo"));

  if (
    currentUserInfo.username === deactivateInput.value &&
    currentUserInfo.password === deactivatePassword.value
  ) {
    const index = retrieved.findIndex(
      (element) => element.username === currentUserInfo.username
    );
    console.log(index);
    retrieved.splice(index, 1);
    localStorage.setItem("userInfo", JSON.stringify(retrieved));
    console.log(retrieved);
    modal.style.display = "none";
    window.location.href = "index.html";
  }
}

// CHECK USER

//  PROFILE BACK

function profileBackBtn() {
  let transactionsDiv = document.querySelector(".transactionsDiv");
  location.reload();
  screen.innerHTML = "";
  transactionsDiv.style.display = "none";
}

//  VISIBILTY BUTTON

function visibilitybtn() {
  let visibilityOffIcon = document.querySelector(".visibilityOffIcon");
  let balance = document.querySelector(".bal");
  if (balance.style.visibility === "hidden") {
    balance.style.visibility = "visible";
    visibilityOffIcon.innerHTML = `<span class="material-symbols-outlined">
    visibility
    </span>`;
  } else {
    balance.style.visibility = "hidden";
    visibilityOffIcon.innerHTML = `<span class="material-symbols-outlined">
    visibility_off
    </span>`;
  }
}

// COPY BUTTON

function copyBtn() {
  let num = document.querySelector(".num").innerText;
  navigator.clipboard
    .writeText(num)
    .then(() => {
      alert("copied");
      console.log("Text copied to clipboard");
    })
    .catch(() => {
      console.log("Error copying text");
    });
}

// CLOSE BUTTON

function closeBtnn() {
  let modal4 = document.querySelector(".modal4");
  modal4.style.display = "none";
}

let modal4 = document.querySelector(".modal4");
let balanceShow2 = document.querySelector(".balanceShow2");
let airtimeBtn = document.getElementById("airtimeBtn");
airtimeBtn.addEventListener("click", function () {
  phoneInput.value = "";
  amountphoneInput.value = "";
  pinInput.value = "";
  modal4.style.display = "block";
  let currentUserInfo = gotten.find(
    (element) => element.username === currentUser
  );
  balanceShow2.textContent = `$${currentUserInfo.accountBalance}`;
  console.log(currentUserInfo.accountBalance);
});

// BUY AIRTIME

let buyBtn = document.getElementById("buyBtn");
let phoneInput = document.getElementById("phoneInput");
let amountphoneInput = document.getElementById("amountphoneInput");
let pinInput = document.getElementById("pinInput");
let date = new Date();
let newDate = date.toLocaleDateString();
let newTime = date.toLocaleTimeString();
let phoneNumError = document.querySelector(".phoneNumError");
let amountNumError = document.querySelector(".amountNumError");
let phonePinError = document.querySelector(".phonePinError");
buyBtn.addEventListener("click", function () {
  phoneNumError.textContent = "";
  amountNumError.textContent = "";
  phonePinError.textContent = "";

  let amount = Number(amountphoneInput.value);
  let pin = pinInput.value;

  if (phoneInput.value == "") {
    phoneNumError.textContent = "Enter recipient phone number";
  }
  if (amountphoneInput.value == "") {
    amountNumError.textContent = "Enter an amount";
  }
  if (pin == "") {
    phonePinError.textContent = "Enter your pin";
  }
  let currentUserInfo = gotten.find(
    (element) => element.username === currentUser
  );
  console.log(currentUserInfo.accountBalance);
  if (phoneInput.value.length >= 12) {
    // alert("Check number");
  } else if (amount > currentUserInfo.accountBalance) {
    alert("Insufficient funds");
  } else if (currentUserInfo.userpin !== pin) {
    // alert("Incorrect pin");
  } else {
    let airtimeInfo = {
      Number: phoneInput.value,
      Amount: `${amount}`,
      date: `${newDate}`,
      time: `${newTime}`,
    };
    // console.log(airtimeInfo);
    historyArr.push(airtimeInfo);
    console.log(historyArr);
    currentUserInfo.accountBalance -= amount;
    console.log(currentUserInfo.accountBalance);
    localStorage.setItem("userInfo", JSON.stringify(gotten));
    localStorage.setItem("airtimeInfo", JSON.stringify(historyArr));
    // alert("Successful✅");
    modal4.style.display = "none";
  }
  generate();
});
// VISIBILITY BUTTON

let balance = document.querySelector(".bal");
let visibilityBtn = document.getElementById("visibilityBtn");
visibilityBtn.addEventListener("click", function () {
  if (balance.style.visibility === "hidden") {
    balance.style.visibility = "visible";

    visibilityBtn.innerHTML = `  <span  id="visibilityBtn" class="visibilityOffIcon material-symbols-outlined">
    visibility
    </span>`;
  } else {
    balance.style.visibility = "hidden";
    visibilityBtn.innerHTML = `<span id="visibilityBtn"  class="visibilityOffIcon material-symbols-outlined">
    visibility_off
    </span>`;
  }
});

// TRANS HOME BUTTON

function homeBtnn() {
  screen.style.display = "none";
  ccHistory.style.display = "block";
  location.reload();
}

// function airtimeGot(){
//     let airtimeGotten = JSON.parse(localStorage.getItem("airtimeInfo"))
//     console.log(airtimeGotten);
// }
// airtimeGot()

// let generateBtn = document.getElementById("generateBtn");
// generateBtn.addEventListener("click", function(){
//   let statementGotten = JSON.parse(localStorage.getItem("sendInfo"))
//   console.log(statementGotten);

//   let total = statementGotten.reduce(function(acc,obj){
//     return acc + parseInt(obj.sendersAmt)
//   }, 0)
//   console.log(total);
// })

// PROFILE
let profileBtn = document.getElementById("profileBtn");
profileBtn.addEventListener("click", function () {
  let currentUserInfo = gotten.find(
    (element) => element.username === currentUser
  );
  console.log(currentUserInfo.username);
  if (currentUserInfo) {
    ccHistory.style.display = "none";
    accountInfoDiv.style.display = "none";
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
                <div class="modalinput3">
                    <input type="text" id="deactivateInput" placeholder="Enter your username">
                    <input type="text" id="deactivatePassword" placeholder="Enter your password">
                    </div>
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
      
    `;
    let profilename = document.querySelector(".name");
    profilename.textContent = ` Welcome, ${currentUserInfo.firstName}`;
  }
});


let creditCardBtn = document.querySelector(".creditCardBtn");
let creditCard = document.querySelector(".creditCard");
let creditCardBack = document.querySelector(".creditCardBack");
creditCardBtn.addEventListener("click", function () {
if(creditCard){
  creditCard.innerHTML = `<div class="ccBack">
  <p class="radText">radfintech</p>
  <div class="cvvDiv">
      <p class="cvv">999</p>
  </div>
</div>`
} else if(creditCardBack) {
  creditCard.innerHTML = `<div class="creditCard creditCardBtn">
  <div class="cc">
      <p class="radText">Rad</p>
      <div class="circle">
          <p class="circle1"></p>
          <p class="circle2"></p>
      </div>
  </div>
  <div class="cardNumDiv">
      <p class="cardnum">**** **** **** ****</p>
      <p class="expDate">**/**</p>
      
  </div>
</div>`
}  
});

