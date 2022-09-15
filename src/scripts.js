// DEPENDENCIES **************************************************
import './css/styles.css';
import { fetchData, postData } from './apiCalls';
import Repository from './Repository';
import User from './User';

// GLOBAL DATA ***************************************************
let userRepository;
let hydrationRepository;
let sleepRepository;
let activityRepository;
let randomUser;
let timeframe;

// FETCH DATA *****************************************************
Promise.all([fetchData("users"), fetchData("hydration"), fetchData("sleep"), fetchData("activity")])
  .then((repos) => {
    console.log(repos[3])
    setData(repos);
  });

function setData(repos) {
  userRepository = new Repository(repos[0].userData);
  randomUser = getRandomUser(userRepository.data);
  hydrationRepository = new Repository(repos[1].hydrationData);
  randomUser.setUserData(hydrationRepository, 'hydrationData', 'userID');
  sleepRepository = new Repository(repos[2].sleepData);
  randomUser.setUserData(sleepRepository, 'sleepData', 'userID');
  activityRepository = new Repository(repos[3].activityData);
  randomUser.setUserData(activityRepository, 'activityData', 'userID');
  timeframe = randomUser.hydrationData[randomUser.hydrationData.length - 1].date;

  displayUserData();
}

function getRandomUser(users) {
  const randomIndex = Math.floor(Math.random() * users.length);
  const randomUserData = userRepository.findUser(randomIndex, 'id');
  return new User(randomUserData[0]);
}

// DOM ELEMENTS ***************************************************
const userFirstName = document.querySelector(".user-first-name");
const userAddress = document.querySelector(".user-address");
const userEmail = document.querySelector(".user-email");
const userStepGoal = document.querySelector(".user-step-goal");
const repoStepGoal = document.querySelector(".repo-step-goal");
const userStrideLength = document.querySelector(".user-stride-length");
const userFriends = document.querySelector(".friend-names");
const timeframeDisplay = document.querySelector(".timeframe-display");
const timeFrameBtn = document.querySelector(".timeframe-button");
const timeframeButtonText = document.querySelector(".timeframe-button-text");
const updateInfoBtn = document.querySelector(".update-button");
const updateInfoBtnText = document.querySelector(".update-button-text");

const dataForm = document.querySelector(".data-box");
const dataChoices = document.querySelector(".data-choices");
const waterFormDisplays = Array.from(document.querySelectorAll(".water-form"));
const sleepFormDisplays = Array.from(document.querySelectorAll(".sleep-form"));
const activityFormDisplays = Array.from(document.querySelectorAll(".activity-form"));
const waterInfo = document.querySelector(".water-information");
const avgWaterAmount = document.querySelector(".avg-water-amount");
const waterDate = document.querySelector(".water-date");
const waterAmount = document.querySelector(".water-amount");
const sleepInfo = document.querySelector(".sleep-information")
const avgSleepAmount = document.querySelector(".avg-sleep-amount");
const sleepDate = document.querySelector(".sleep-date");
const sleepAmount = document.querySelector(".sleep-amount");
const avgSleepQuality = document.querySelector(".avg-sleep-quality");
const sleepQual = document.querySelector(".sleep-quality");

// EVENT LISTENERS ************************************************
timeFrameBtn.addEventListener('click', displayWeeklyTimeFrames);

updateInfoBtn.addEventListener('click', function() {
  dataForm.classList.toggle('hidden');
  if (updateInfoBtnText.innerText === "SHOW") {
    updateInfoBtnText.innerText = "HIDE";
  }
  else {
    updateInfoBtnText.innerText = "SHOW";
  }
})

dataChoices.addEventListener('change', function() {
  if (dataChoices.selectedIndex === 0) { //water
    waterFormDisplays.forEach(display => {
      display.classList.remove('hidden');
    })
    sleepFormDisplays.forEach(display => {
      display.classList.add('hidden');
    })
    activityFormDisplays.forEach(display => {
      display.classList.add('hidden');
    })
  }
  else if (dataChoices.selectedIndex === 1) { //sleep
    waterFormDisplays.forEach(display => {
      display.classList.add('hidden');
    })
    sleepFormDisplays.forEach(display => {
      display.classList.remove('hidden');
    })
    activityFormDisplays.forEach(display => {
      display.classList.add('hidden');
    })
  }
  else if (dataChoices.selectedIndex === 2) { //activity
    waterFormDisplays.forEach(display => {
      display.classList.add('hidden');
    })
    sleepFormDisplays.forEach(display => {
      display.classList.add('hidden');
    })
    activityFormDisplays.forEach(display => {
      display.classList.remove('hidden');
    })
  }
})

// EVENT HANDLERS *************************************************
function displayUserData() {
  displayUserInfo();
  displayStepData();
  displayWidgetData();
}

function displayUserInfo() {
  userFirstName.innerText = randomUser.name;
  userAddress.innerText = randomUser.address;
  userEmail.innerText = randomUser.email;
  const theirFriends = randomUser.friends.flatMap(friend => userRepository.findUser(friend, 'id'));
  const theirFriendsName = theirFriends.map(friend => friend.name).forEach((friend) => {
    userFriends.innerHTML += `<p>${friend}</p>`
  });
}

function displayStepData() {
  userStepGoal.innerText = randomUser.dailyStepGoal;
  repoStepGoal.innerText = userRepository.calcRepoAvg('dailyStepGoal');
  userStrideLength.innerText = randomUser.strideLength;
}

function displayWidgetData() {
  avgWaterAmount.innerText = randomUser.calcUserAvg('hydrationData', 'numOunces');
  avgSleepAmount.innerText = randomUser.calcUserAvg('sleepData', 'hoursSlept');
  avgSleepQuality.innerText = randomUser.calcUserAvg('sleepData', 'sleepQuality');
  setTimeframeDisplays();
}

function displaySleepData() {
  sleepDate.innerText = timeframe;
  sleepAmount.innerText = randomUser.sleepData[randomUser.sleepData.length - 1].hoursSlept;
  sleepQual.innerText = randomUser.sleepData[randomUser.sleepData.length - 1].sleepQuality;
  sleepInfo.innerHTML += `
  <p>
   <span class="sleep-date">${timeframe}</span>:
   <span class="sleep-amount">${randomUser.sleepData[randomUser.sleepData.length - 1].hoursSlept}</span> hrs,
   <span class="sleep-quality"> ${randomUser.sleepData[randomUser.sleepData.length - 1].sleepQuality}</span>/5 Quality
  </p>
   `;
}

function displayHydrationData() {
  waterDate.innerText = timeframe;
  waterAmount.innerText = randomUser.hydrationData[randomUser.hydrationData.length - 1].numOunces;
  waterInfo.innerHTML += `
  <p>
   <span class="water-date">${timeframe}</span>:
   <span class="water-amount">${randomUser.hydrationData[randomUser.hydrationData.length - 1].numOunces}</span> oz
  </p>
   `;
}

function displaySleepWeek() {
  let displaySleepDays = randomUser.getUserWeeklyData(randomUser.sleepData[randomUser.sleepData.length - 7].date,
    randomUser.sleepData[randomUser.sleepData.length - 1].date, 'sleepData');
  displaySleepDays.forEach((element) => {
  sleepInfo.innerHTML += `
  <p>
    <span class="sleep-date">${element.date}</span>:
    <span class="sleep-amount">${element.hoursSlept}</span> hrs,
    <span class="sleep-quality"> ${element.sleepQuality}</span>/5 Quality
  </p>
    `;
  });
}

function displayHyrationWeek() {
  let displayHydrationDays = randomUser.getUserWeeklyData(randomUser.hydrationData[randomUser.hydrationData.length - 7].date,
    randomUser.hydrationData[randomUser.hydrationData.length - 1].date, 'hydrationData');
  displayHydrationDays.forEach((element) => {
    waterInfo.innerHTML += `
  <p>
    <span class="water-date">${element.date}</span>:
    <span class="water-amount">${element.numOunces}</span> oz
  </p>
    `;
  });
}

function setTimeframeDisplays() {
  waterInfo.innerHTML = "";
  sleepInfo.innerHTML = "";

  if (timeframe === randomUser.hydrationData[randomUser.hydrationData.length - 1].date) {
    timeframeDisplay.innerText = timeframe;
    timeframeButtonText.innerText = "WEEKLY";
    displaySleepData();
    displayHydrationData();
  } else {
    timeframeButtonText.innerText = "TODAY'S";
    displayHyrationWeek();
    displaySleepWeek();
  }
}


function displayWeeklyTimeFrames() {
  if (timeframe === randomUser.hydrationData[randomUser.hydrationData.length - 1].date) {
    timeframe = 0;
  } else {
    timeframe = randomUser.hydrationData[randomUser.hydrationData.length - 1].date;
  }
  setTimeframeDisplays();
}
