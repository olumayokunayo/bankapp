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


//  MATCH ACCOUNT NUMBER WITH NAME

accountInput.addEventListener("input", function () {
  accountInputError.textContent = "";
  receiversName.textContent = "";
  let receiverAcc = gotten.find((element) => {
    return (
      element.accountNumber === Number(accountInput.value) ||
      element.username === accountInput.value
    );
  });
  if (receiverAcc) {
    receiversName.textContent = `${receiverAcc.firstName} ${receiverAcc.lastName}`;
  }
});


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
let receiversName = document.querySelector(".receiversName");
let successPageDiv = document.querySelector(".successPageDiv");


sendBtn.addEventListener("click", function () {
  let receiptDate = new Date();
  let newRecDate = receiptDate.toLocaleDateString();
  let newRecTime = receiptDate.toLocaleTimeString();
  let updatedDT = `${newRecDate} ${newRecTime}`;

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
  console.log(receiverAcc.firstName);
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
 
    traDiv.style.display = "none";
    successPageDiv.style.display = "block"
    generate();
    // clearInterval(timer);
    // logOutTimer(500);
  } else if (currentUserInfo.accountBalance < amount) {
    alert("Insufficient funds ❌");
  } else {
    // console.log("failed");
  }
});

let successButton = document.querySelector(".successButton");
successButton.addEventListener("click", function(){
  successPageDiv.style.display = "none"
    receiptDiv.style.display = "block";
  
})
// HISTORY

let transactionsDiv = document.querySelector(".transactionsDiv");
let historyGotten = JSON.parse(localStorage.getItem("sendInfo"));
let depositsArr = [];
let withdrawalArr = [];

if (historyGotten && historyGotten.length > 0) {
  historyGotten.forEach((element) => {
    console.log(historyGotten);
    if (element.sendersAcc === currentUser) {
      withdrawalArr.push(element);
    } else if (element.receiverAcc === currentUser) {
      depositsArr.push(element);
    }

    let transactionsArr = [...depositsArr, ...withdrawalArr];
    transactionsDiv.innerHTML = `<h5 class="historyhead">History</h5>`

    transactionsArr.forEach((element) => {
      let deposits = element.receiverAcc === currentUser;
      let amountColor = deposits ? "green" : "red";
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
} else  if(!historyGotten){
  transactionsDiv.innerHTML = `<h5 class="historyhead">History</h5>
  <h4 class="notrans">No transaction yet</h4>`;
}

// RECEIPT

let receiptDiv = document.querySelector(".receiptDiv");
let receiptGotten = JSON.parse(localStorage.getItem("sendInfo"));
// console.log(receiptGotten);
receiptDiv.innerHTML = "";
if (receiptGotten) {
  for (let i = 0; i < receiptGotten.length; i++) {
    receiptDiv.innerHTML = `
           <div class="receiptSec">
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
  window.print();
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

// AIRTIME SECTION

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
    // console.log(historyArr);
    currentUserInfo.accountBalance -= amount;
    // console.log(currentUserInfo.accountBalance);
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

// PROFILE

let profileBtn = document.getElementById("profileBtn");
profileBtn.addEventListener("click", function () {
  let currentUserInfo = gotten.find(
    (element) => element.username === currentUser
  );
  console.log(currentUserInfo);
  if (currentUserInfo) {
    ccHistory.style.display = "none";
    accountInfoDiv.style.display = "none";
    topDiv.style.display = "none";
    screen.innerHTML += `
    <div class="profileContainer">
    <div class="profileDiv">
    <span onclick="profileBackBtn()" class="profileBack material-symbols-outlined">
    arrow_back</span>
    <h1 class="profile">Profile</h1>
    <div class="personDiv">
    <div id="profileBtn" class="userAcc userIcon">
    <img src="./images/bankuser.jpg" alt="">
    </div>
    <p class="name animate__animated animate__bounceInDown"></p>
    <div class="NumAndPin">
    <div class="accountNumDiv">
        <h6>Account Number</h6>
        <p class="accountNums"></p>
    </div>
    <div class="userpin">
        <h6>Transaction Pin</h6>
        <p class="accountPin"></p>
    </div>
    </div>
    </div>
   <div class="userDiv">
    <div class="userInfo">
        <div class="user">
            <p>Username</p>
            <h6 class="usernameLabel"></h6>
        </div>
      <div class="user">
        <p>Full name</p>
        <h6 class="fullNameLabel"></h6>
      </div>
      <div class="user">
        <hp>Email</hp>
        <h6 class="emailLabel"></h6>
    </div>
    </div>
    </div>
    <div class="userButtons">
        <div class="deactivate" onclick="deactivateBtn()">
        <span class="material-symbols-outlined">
        block
        </span>
        <span>Deactivate account</span>
        </div>
        <div onclick="logoutBtn()" class="logOut">
        <span class="profileIcon material-symbols-outlined">
        logout
        </span>
        <span>Log out</span>
        </div>
        </div>
    </div>
    </div>  
    `;
    let profilename = document.querySelector(".name");
    let accountNum = document.querySelector(".accountNums");
    let accountPin = document.querySelector(".accountPin");
    let usernameLabel = document.querySelector(".usernameLabel");
    let fullNameLabel = document.querySelector(".fullNameLabel")
    let emailLabel = document.querySelector(".emailLabel")

    profilename.textContent = ` Hello, ${currentUserInfo.firstName}`;
    accountNum.textContent = `${currentUserInfo.accountNumber}`
    accountPin.textContent = `${currentUserInfo.userpin}`
    usernameLabel.textContent = `${currentUserInfo.username}`
    fullNameLabel.textContent = `${currentUserInfo.firstName} ${currentUserInfo.lastName}`
    emailLabel.textContent = `${currentUserInfo.email}`

  }
});

// LOGOUT

function logoutBtn() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
}

//  PROFILE BACK

function profileBackBtn() {
  let transactionsDiv = document.querySelector(".transactionsDiv");
  location.reload();
  screen.innerHTML = "";
  transactionsDiv.style.display = "none";
}

let creditCardBtn = document.querySelector(".creditCardBtn");
let creditCard = document.querySelector(".creditCard");
let creditCardBack = document.querySelector(".creditCardBack");
creditCardBtn.addEventListener("click", function () {
  if (creditCard) {
    creditCard.innerHTML = `<div class="ccBack">
  <p class="radText">radfintech</p>
  <div class="cvvDiv">
      <p class="cvv">999</p>
  </div>
</div>`;
  } else if (creditCardBack) {
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
</div>`;
  }
});
