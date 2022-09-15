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

// let timeframe; - instead, could use three distinct dates

let hydrationDataDate;
let sleepDataDate;
let activityDataDate;

// FETCH DATA *****************************************************
Promise.all([fetchData("users"), fetchData("hydration"), fetchData("sleep"), fetchData("activity")])
  .then((repos) => {
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
  findDate();

  // timeframe = randomUser.hydrationData[randomUser.hydrationData.length - 1].date;
  // timeframe was equal to the hydration date;

  console.log('hydration date AND timeframe', randomUser.hydrationData[randomUser.hydrationData.length - 1].date)
  console.log('activity date ',randomUser.activityData[randomUser.activityData.length - 1].date)
  console.log('sleep date', randomUser.sleepData[randomUser.sleepData.length - 1].date)
  console.log('not only are these dates not always the same, the water and sleep dates are also sometimes different ')

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
// const timeFrameBtn = document.querySelector(".timeframe-button");
// const timeframeButtonText = document.querySelector(".timeframe-button-text");
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

const userMinutesActive = document.querySelector(".user-active-mins");
const repoAvgSteps = document.querySelector('.repo-avg-steps');
const repoAvgStairs = document.querySelector('.repo-avg-stairs');
const repoAvgMinutes = document.querySelector('.repo-avg-mins');
const stepDate = document.querySelector('.step-date');
const userStepAmount = document.querySelector('.user-step-amount');
const userFlights = document.querySelector('.user-stair-flights');
const userStepDistance = document.querySelector('.user-step-distance');

// these are the new DOM elements I made to implement this logic
const waterTimeFrameBtn = document.querySelector(".water-timeframe-button");
const waterTimeframeBtnText = document.querySelector(".water-timeframe-button-text");

const sleepTimeFrameBtn = document.querySelector(".sleep-timeframe-button");
const sleepTimeframeBtnText = document.querySelector(".sleep-timeframe-button-text");

const activityTimeFrameBtn = document.querySelector(".activity-timeframe-button");
const activityTimeframeBtnText = document.querySelector(".activity-timeframe-button-text");
const activityInfo = document.querySelector(".activity-information") // I put the info we wanted to change for weekly display in an article in the index file

// EVENT LISTENERS ************************************************
waterTimeFrameBtn.addEventListener('click', setWaterBtnDisplays);
sleepTimeFrameBtn.addEventListener('click', setSleepBtnDisplays);
activityTimeFrameBtn.addEventListener('click', setActivityBtnDisplays);

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

// could determine if the dates are the same; could also use these repoDataDate variables in our other functions
function findDate() {
  hydrationDataDate = randomUser.hydrationData[randomUser.hydrationData.length - 1].date;
  sleepDataDate = randomUser.sleepData[randomUser.sleepData.length - 1].date;
  activityDataDate = randomUser.activityData[randomUser.activityData.length - 1].date;

  if (hydrationDataDate !== sleepDataDate && sleepDataDate !== activityDataDate) {
    alert(`You don't have data available for today in all categories. You will be shown your most recent data instead.`)
  }
}

function displayUserData() {
  displayUserInfo();
  displayStepData();

  // displayWidgetData(); could move widget data into repsective repo displays (was just sleep and water avg data)

  displaySleepData();
  displayHydrationData();
  setTimeframeDisplays();
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
  stepDate.innerText = activityDataDate;
  userStepAmount.innerText = randomUser.findUserDataByDate(activityDataDate, 'activityData').numSteps;
  userFlights.innerText = randomUser.findUserDataByDate(activityDataDate, 'activityData').flightsOfStairs;
  userMinutesActive.innerText = randomUser.findUserDataByDate(activityDataDate,'activityData').minutesActive;
  userStrideLength.innerText = randomUser.strideLength;
  userStepDistance.innerText = randomUser.calcMiles(activityDataDate);
  repoAvgSteps.innerText = activityRepository.calcRepoAvgByDate('numSteps', activityDataDate);
  repoAvgStairs.innerText = activityRepository.calcRepoAvgByDate('flightsOfStairs', activityDataDate);
  repoAvgMinutes.innerText = activityRepository.calcRepoAvgByDate('minutesActive', activityDataDate);
  userStepGoal.innerText = randomUser.dailyStepGoal;
  repoStepGoal.innerText = userRepository.calcRepoAvg('dailyStepGoal');
  // console.log('timeframe, or most recent water date', timeframe);
  // console.log('most recent activity date:', randomUser.activityData[randomUser.activityData.length - 1].date);
  // console.log('most recent sleep date:', randomUser.sleepData[randomUser.sleepData.length - 1].date);

  // try {
  //   repoAvgSteps.innerText = activityRepository.calcRepoAvgByDate('numSteps', timeframe);
  //   repoAvgStairs.innerText = activityRepository.calcRepoAvgByDate('flightsOfStairs', timeframe);
  //   repoAvgMinutes.innerText = activityRepository.calcRepoAvgByDate('minutesActive', timeframe);
  //   stepDate.innerText = timeframe;
  //   userStepAmount.innerText = randomUser.findUserDataByDate(timeframe, 'activityData').numSteps;
  //   userFlights.innerText = randomUser.findUserDataByDate(timeframe, 'activityData').flightsOfStairs;
  //   userStepDistance.innerText = randomUser.calcMiles(timeframe);
  //   userMinutesActive.innerText = randomUser.findUserDataByDate(timeframe,'activityData').minutesActive;
  // }
  // catch {
  //   alert(`You dont have activity data for ${timeframe}. You will be shown your most recent activity data.`)
  //   timeframe = randomUser.activityData[randomUser.activityData.length - 1].date
  //   repoAvgSteps.innerText = activityRepository.calcRepoAvgByDate('numSteps', timeframe);
  //   repoAvgStairs.innerText = activityRepository.calcRepoAvgByDate('flightsOfStairs', timeframe);
  //   repoAvgMinutes.innerText = activityRepository.calcRepoAvgByDate('minutesActive', timeframe);
  //   stepDate.innerText = timeframe;
  //   userStepAmount.innerText = randomUser.findUserDataByDate(timeframe, 'activityData').numSteps;
  //   userFlights.innerText = randomUser.findUserDataByDate(timeframe, 'activityData').flightsOfStairs;
  //   userStepDistance.innerText = randomUser.calcMiles(timeframe);
  //   userMinutesActive.innerText = randomUser.findUserDataByDate(timeframe,'activityData').minutesActive;
  // }
  // finally {
  //    timeframe = randomUser.hydrationData[randomUser.hydrationData.length - 1].date;
  // }
}

// function displayWidgetData() {
  // avgWaterAmount.innerText = randomUser.calcUserAvg('hydrationData', 'numOunces');
  // avgSleepAmount.innerText = randomUser.calcUserAvg('sleepData', 'hoursSlept');
  // avgSleepQuality.innerText = randomUser.calcUserAvg('sleepData', 'sleepQuality');
  // setTimeframeDisplays();
// }

function displaySleepData() {
  sleepDate.innerText = sleepDataDate; //instead of timeframe
  sleepAmount.innerText = randomUser.sleepData[randomUser.sleepData.length - 1].hoursSlept;
  sleepQual.innerText = randomUser.sleepData[randomUser.sleepData.length - 1].sleepQuality;

  // could handle this display change with respective repo weekly/most recent btns
  // sleepInfo.innerHTML += `
  // <p>
  //  <span class="sleep-date">${sleepDataDate}</span>:
  //  <span class="sleep-amount">${randomUser.sleepData[randomUser.sleepData.length - 1].hoursSlept}</span> hrs,
  //  <span class="sleep-quality"> ${randomUser.sleepData[randomUser.sleepData.length - 1].sleepQuality}</span>/5 Quality
  // </p>
  //  `;

  // here is displayWidgetData for sleep
   avgSleepAmount.innerText = randomUser.calcUserAvg('sleepData', 'hoursSlept');
   avgSleepQuality.innerText = randomUser.calcUserAvg('sleepData', 'sleepQuality');
}

function displayHydrationData() {
  waterDate.innerText = hydrationDataDate; //instead of timeframe
  waterAmount.innerText = randomUser.hydrationData[randomUser.hydrationData.length - 1].numOunces;

  // could handle this display change with respective repo weekly/most recent btns
  // waterInfo.innerHTML += `
  // <p>
  //  <span class="water-date">${hydrationDataDate}</span>:
  //  <span class="water-amount">${randomUser.hydrationData[randomUser.hydrationData.length - 1].numOunces}</span> oz
  // </p>
  //  `;
  avgWaterAmount.innerText = randomUser.calcUserAvg('hydrationData', 'numOunces');
}

// this function could determine 'today', the most recent dates of all three repos
function setTimeframeDisplays() {
  if (hydrationDataDate === sleepDataDate && sleepDataDate === activityDataDate) {
    timeframeDisplay.innerText = hydrationDataDate;
  }
  else if (hydrationDataDate > sleepDataDate && hydrationDataDate > activityDataDate) {
    timeframeDisplay.innerText = hydrationDataDate;
  }
  else if (sleepDataDate > hydrationDataDate && sleepDataDate > activityDataDate) {
    timeframeDisplay.innerText = sleepDataDate;
  }
  else {
    timeframeDisplay.innerText = activityDataDate;
  }
}

function setWaterBtnDisplays() {
  waterInfo.innerHTML = "";
  if (waterTimeframeBtnText.innerText === "WEEKLY") {
    waterTimeframeBtnText.innerText = "MOST RECENT";
    displayHydrationWeek()
  } else {
    waterTimeframeBtnText.innerText = "WEEKLY"; // could handle the display chng here, or we could make a separate fnc; could attempt a dynamic fnc as well
    waterInfo.innerHTML += `
    <p>
     <span class="water-date">${hydrationDataDate}</span>:
     <span class="water-amount">${randomUser.hydrationData[randomUser.hydrationData.length - 1].numOunces}</span> oz
    </p>
     `;
  }
}

function displayHydrationWeek() {
  let displayHydrationDays = randomUser.getUserWeeklyData(randomUser.hydrationData[randomUser.hydrationData.length - 7].date,
    hydrationDataDate, 'hydrationData');
  displayHydrationDays.forEach((element) => {
    waterInfo.innerHTML += `
  <p>
    <span class="water-date">${element.date}</span>:
    <span class="water-amount">${element.numOunces}</span> oz
  </p>
    `;
  });
}

function setSleepBtnDisplays() {
  sleepInfo.innerHTML = "";
  if (sleepTimeframeBtnText.innerText === "WEEKLY") {
    sleepTimeframeBtnText.innerText = "MOST RECENT";
    displaySleepWeek()
  } else {
    sleepTimeframeBtnText.innerText = "WEEKLY"; // could handle the display chng here, or we could make a separate fnc; could attempt a dynamic fnc as well
    sleepInfo.innerHTML += `
    <p>
     <span class="sleep-date">${sleepDataDate}</span>:
     <span class="sleep-amount">${randomUser.sleepData[randomUser.sleepData.length - 1].hoursSlept}</span> hrs,
     <span class="sleep-quality"> ${randomUser.sleepData[randomUser.sleepData.length - 1].sleepQuality}</span>/5 Quality
    </p>
    `
  }
}

function displaySleepWeek() {
  let displaySleepDays = randomUser.getUserWeeklyData(randomUser.sleepData[randomUser.sleepData.length - 7].date,
    sleepDataDate, 'sleepData');
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

function setActivityBtnDisplays() {
  activityInfo.innerHTML = "";
  if (activityTimeframeBtnText.innerText === "WEEKLY") {
    activityTimeframeBtnText.innerText = "MOST RECENT";
    displayActivityWeek()
  } else {
    activityTimeframeBtnText.innerText = "WEEKLY"; // could handle the display chng here, or we could make a separate fnc; could attempt a dynamic fnc as well
    activityInfo.innerHTML += `
    <p>
     <span class="step-date">${activityDataDate}</span>: <span class="user-step-amount">${randomUser.findUserDataByDate(activityDataDate, 'activityData').numSteps}</span> steps, <span class="user-stair-flights">${randomUser.findUserDataByDate(activityDataDate, 'activityData').flightsOfStairs}</span> flights, <span class="user-active-mins">${randomUser.findUserDataByDate(activityDataDate,'activityData').minutesActive}</span> mins active
    </p>
    <p>
      Given your <span class="user-stride-length">${randomUser.strideLength}</span> ft stride length, you walked <span class="user-step-distance">${randomUser.calcMiles(activityDataDate)}</span> miles today!
    </p>
    `
  }
}

function displayActivityWeek() {
  let displayActivityDays = randomUser.getUserWeeklyData(randomUser.activityData[randomUser.activityData.length - 7].date,
    activityDataDate, 'activityData');
  displayActivityDays.forEach((element) => {
    // this activityInfo needs to be refactored for activity info, just threw it in here to demonstrate!
  activityInfo.innerHTML += `
  <p>
    <span class="step-date">${element.date}</span>:
    <span class="user-step-amount">${element.numSteps}</span> steps,
    <span class="user-stair-flights">${element.flightsOfStairs}</span> flights,
    <span class="user-active-mins">${element.minutesActive}</span> mins active</p>
  </p>
    `;
  });
}

// function setTimeframeDisplays() {
//   waterInfo.innerHTML = "";
//   sleepInfo.innerHTML = "";
//
//   if (timeframe === randomUser.hydrationData[randomUser.hydrationData.length - 1].date) {
//     timeframeDisplay.innerText = timeframe;
//     timeframeButtonText.innerText = "WEEKLY";
//     displaySleepData();
//     displayHydrationData();
//   } else {
//     timeframeButtonText.innerText = "TODAY'S";
//     displayHyrationWeek();
//     displaySleepWeek();
//   }
// }
//
//
// function displayWeeklyTimeFrames() {
//   if (timeframe === randomUser.hydrationData[randomUser.hydrationData.length - 1].date) {
//     timeframe = 0;
//   } else {
//     timeframe = randomUser.hydrationData[randomUser.hydrationData.length - 1].date;
//   }
//   setTimeframeDisplays();
// }
