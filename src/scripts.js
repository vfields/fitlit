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
  setDates();

  displayUserData();
}

function getRandomUser(users) {
  const randomIndex = Math.floor(Math.random() * users.length);
  const randomUserData = userRepository.findUser(randomIndex, 'id');
  return new User(randomUserData[0]);
}

function setDates() {
  hydrationDataDate = randomUser.hydrationData[randomUser.hydrationData.length - 1].date;
  sleepDataDate = randomUser.sleepData[randomUser.sleepData.length - 1].date;
  activityDataDate = randomUser.activityData[randomUser.activityData.length - 1].date;

  if (hydrationDataDate !== sleepDataDate && sleepDataDate !== activityDataDate) {
    alert(`You don't have data available for today in all categories. You will be shown your most recent data instead.`);
  }
}

// DOM ELEMENTS ***************************************************
const userFirstName = document.querySelector('.user-first-name');
const userAddress = document.querySelector('.user-address');
const userEmail = document.querySelector('.user-email');
const userFriends = document.querySelector('.friend-names');
const timeframeDisplay = document.querySelector('.timeframe-display');
const updateInfoBtn = document.querySelector('.update-button');
const updateInfoBtnText = document.querySelector('.update-button-text');
const dataForm = document.querySelector('.data-box');
const dataChoices = document.querySelector('.data-choices');
const dateInput = document.getElementById('activity-date');
const waterFormDisplays = Array.from(document.querySelectorAll('.water-form'));
const waterInput = document.querySelector('.water-intake-input');
const sleepFormDisplays = Array.from(document.querySelectorAll('.sleep-form'));
const hoursInput = document.querySelector('.hours-slept-input');
const sleepQualityInput = document.querySelector('.sleep-quality-input');
const activityFormDisplays = Array.from(document.querySelectorAll('.activity-form'));
const numOfStepsInput = document.querySelector('.number-of-steps-input');
const flightsOfStairsInput = document.querySelector('.flights-of-stairs-input');
const minsActiveInput = document.querySelector('.mins-active-input');
const saveBtn = document.querySelector('.save-btn');
const waterInfo = document.querySelector('.water-information');
const avgWaterAmount = document.querySelector('.avg-water-amount');
const waterDate = document.querySelector('.water-date');
const waterAmount = document.querySelector('.water-amount');
const waterTimeFrameBtn = document.querySelector('.water-timeframe-button');
const waterTimeframeBtnText = document.querySelector('.water-timeframe-button-text');
const sleepInfo = document.querySelector('.sleep-information')
const avgSleepAmount = document.querySelector('.avg-sleep-amount');
const sleepDate = document.querySelector('.sleep-date');
const sleepAmount = document.querySelector('.sleep-amount');
const avgSleepQuality = document.querySelector('.avg-sleep-quality');
const sleepQual = document.querySelector('.sleep-quality');
const sleepTimeFrameBtn = document.querySelector('.sleep-timeframe-button');
const sleepTimeframeBtnText = document.querySelector('.sleep-timeframe-button-text');
const userMinutesActive = document.querySelector('.user-active-mins');
const repoAvgSteps = document.querySelector('.repo-avg-steps');
const repoAvgStairs = document.querySelector('.repo-avg-stairs');
const repoAvgMinutes = document.querySelector('.repo-avg-mins');
const stepDate = document.querySelector('.step-date');
const userStepAmount = document.querySelector('.user-step-amount');
const userFlights = document.querySelector('.user-stair-flights');
const userStepDistance = document.querySelector('.user-step-distance');
const activityTimeFrameBtn = document.querySelector('.activity-timeframe-button');
const activityTimeframeBtnText = document.querySelector('.activity-timeframe-button-text');
const activityInfo = document.querySelector('.activity-information');
const userStepGoal = document.querySelector('.user-step-goal');
const repoStepGoal = document.querySelector('.repo-step-goal');
const userStrideLength = document.querySelector('.user-stride-length');

// EVENT LISTENERS ************************************************
updateInfoBtn.addEventListener('click', displayDataForm);
dataChoices.addEventListener('change', displayFormSelection);
saveBtn.addEventListener('click', getInputValues);
waterTimeFrameBtn.addEventListener('click', setWaterBtnDisplays);
sleepTimeFrameBtn.addEventListener('click', setSleepBtnDisplays);
activityTimeFrameBtn.addEventListener('click', setActivityBtnDisplays);

// EVENT HANDLERS *************************************************
function displayUserData() {
  displayUserInfo();
  setTimeframeDisplay();
  displayHydrationData();
  displaySleepData();
  displayActivityData();
}

function displayUserInfo() {
  userFirstName.innerText = randomUser.name;
  userAddress.innerText = randomUser.address;
  userEmail.innerText = randomUser.email;
  const theirFriends = randomUser.friends.flatMap(friend => userRepository.findUser(friend, 'id'));
  theirFriends.map(friend => friend.name).forEach((friend) => {
    userFriends.innerHTML += `<p>${friend}</p>`
  });
}

function setTimeframeDisplay() {
  const dates = [hydrationDataDate, sleepDataDate, activityDataDate];
  dates.sort((a, b) => a < b ? 1 : -1);
  timeframeDisplay.innerText = dates[0];
}

function displayHydrationData() {
  waterDate.innerText = hydrationDataDate;
  waterAmount.innerText = randomUser.hydrationData[randomUser.hydrationData.length - 1].numOunces;
  avgWaterAmount.innerText = randomUser.calcUserAvg('hydrationData', 'numOunces');
}

function displaySleepData() {
  sleepDate.innerText = sleepDataDate;
  sleepAmount.innerText = randomUser.sleepData[randomUser.sleepData.length - 1].hoursSlept;
  sleepQual.innerText = randomUser.sleepData[randomUser.sleepData.length - 1].sleepQuality;
  avgSleepAmount.innerText = randomUser.calcUserAvg('sleepData', 'hoursSlept');
  avgSleepQuality.innerText = randomUser.calcUserAvg('sleepData', 'sleepQuality');
}

function displayActivityData() {
  stepDate.innerText = activityDataDate;
  userStepAmount.innerText = randomUser.findUserDataByDate(activityDataDate, 'activityData').numSteps;
  userFlights.innerText = randomUser.findUserDataByDate(activityDataDate, 'activityData').flightsOfStairs;
  userMinutesActive.innerText = randomUser.findUserDataByDate(activityDataDate,'activityData').minutesActive;
  userStrideLength.innerText = randomUser.strideLength;
  userStepDistance.innerText = randomUser.calcDistance(activityDataDate);
  repoAvgSteps.innerText = activityRepository.calcRepoAvgByDate('numSteps', activityDataDate);
  repoAvgStairs.innerText = activityRepository.calcRepoAvgByDate('flightsOfStairs', activityDataDate);
  repoAvgMinutes.innerText = activityRepository.calcRepoAvgByDate('minutesActive', activityDataDate);
  userStepGoal.innerText = randomUser.dailyStepGoal;
  repoStepGoal.innerText = userRepository.calcRepoAvg('dailyStepGoal');
}

function displayDataForm() {
  dataForm.classList.toggle('hidden');
  dataForm.reset();
  displayFormSelection();

  if (updateInfoBtnText.innerText === "SHOW") {
    updateInfoBtnText.innerText = "HIDE";
  }
  else {
    updateInfoBtnText.innerText = "SHOW";
  }
}

function displayFormSelection() {
  if (`${dataChoices.value}` === "hydration") {
    waterFormDisplays.forEach(display => {
      display.classList.remove('hidden');
    });
    sleepFormDisplays.forEach(display => {
      display.classList.add('hidden');
    });
    activityFormDisplays.forEach(display => {
      display.classList.add('hidden');
    });
 }
  else if (`${dataChoices.value}` === "sleep") {
    waterFormDisplays.forEach(display => {
      display.classList.add('hidden');
    });
    sleepFormDisplays.forEach(display => {
      display.classList.remove('hidden');
    });
    activityFormDisplays.forEach(display => {
      display.classList.add('hidden');
    });
  }
  else if (`${dataChoices.value}` === "activity") {
    waterFormDisplays.forEach(display => {
      display.classList.add('hidden');
    });
    sleepFormDisplays.forEach(display => {
      display.classList.add('hidden');
    });
    activityFormDisplays.forEach(display => {
      display.classList.remove('hidden');
    });
  }
}

function getInputValues(event) {
  event.preventDefault();

  const userInputData = {
    userID: randomUser.id,
    date: dateInput.value.split('-').join('/')
  };

  if (`${dataChoices.value}` === "hydration") {
    userInputData.numOunces = parseInt(waterInput.value);
  }
  else if (`${dataChoices.value}` === "sleep") {
    userInputData.hoursSlept = parseInt(hoursInput.value);
    userInputData.sleepQuality = parseInt(sleepQualityInput.value);
  } 
  else if (`${dataChoices.value}` === "activity") {
    userInputData.flightsOfStairs = parseInt(flightsOfStairsInput.value);
    userInputData.minutesActive = parseInt(minsActiveInput.value);
    userInputData.numSteps = parseInt(numOfStepsInput.value);
  };

  postData(`${dataChoices.value}`, userInputData);
}

function setWaterBtnDisplays() {
  waterInfo.innerHTML = "";
  if (waterTimeframeBtnText.innerText === "WEEKLY") {
    waterTimeframeBtnText.innerText = "MOST RECENT";
    displayHydrationWeek();
  } else {
    waterTimeframeBtnText.innerText = "WEEKLY";
    waterInfo.innerHTML += `
    <p>
      <span class="water-date">${hydrationDataDate}</span>:
      <span class="water-amount">${randomUser.hydrationData[randomUser.hydrationData.length - 1].numOunces}</span> oz
    </p>
    `;
  }
}

function displayHydrationWeek() {
  let displayHydrationDays = randomUser.getUserWeeklyData(randomUser.hydrationData[randomUser.hydrationData.length - 7].date, hydrationDataDate, 'hydrationData');
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
    displaySleepWeek();
  } else {
    sleepTimeframeBtnText.innerText = "WEEKLY";
    sleepInfo.innerHTML += `
    <p>
     <span class="sleep-date">${sleepDataDate}</span>:
     <span class="sleep-amount">${randomUser.sleepData[randomUser.sleepData.length - 1].hoursSlept}</span> hrs,
     <span class="sleep-quality"> ${randomUser.sleepData[randomUser.sleepData.length - 1].sleepQuality}</span>/5 Quality
    </p>
    `;
  }
}

function displaySleepWeek() {
  let displaySleepDays = randomUser.getUserWeeklyData(randomUser.sleepData[randomUser.sleepData.length - 7].date, sleepDataDate, 'sleepData');
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
    displayActivityWeek();
  } else {
    activityTimeframeBtnText.innerText = "WEEKLY";
    activityInfo.innerHTML += `
    <p>
      <span class="step-date">${activityDataDate}</span> : 
      <span class="user-step-amount">${randomUser.findUserDataByDate(activityDataDate, 'activityData').numSteps}</span> steps, 
      <span class="user-stair-flights">${randomUser.findUserDataByDate(activityDataDate, 'activityData').flightsOfStairs}</span> flights, 
      <span class="user-active-mins">${randomUser.findUserDataByDate(activityDataDate,'activityData').minutesActive}</span> mins active
    </p>
    <p>
      Given your <span class="user-stride-length">${randomUser.strideLength}</span> ft stride length, 
      you walked <span class="user-step-distance">${randomUser.calcDistance(activityDataDate)}</span> miles today!
    </p>
    `;
  }
}

function displayActivityWeek() {
  let displayActivityDays = randomUser.getUserWeeklyData(randomUser.activityData[randomUser.activityData.length - 7].date, activityDataDate, 'activityData');
  displayActivityDays.forEach((element) => {
  activityInfo.innerHTML += `
  <p>
    <span class="step-date">${element.date}</span> :
    <span class="user-step-amount">${element.numSteps}</span> steps,
    <span class="user-stair-flights">${element.flightsOfStairs}</span> flights,
    <span class="user-active-mins">${element.minutesActive}</span> mins active
  </p>
    `;
  });
}

export { displayDataForm };
