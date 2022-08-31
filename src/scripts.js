// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// DEPENDENCIES **************************************************
import './css/styles.css';
import './images/turing-logo.png';
// import userData from './data/users';
import fetchData from './apiCalls';
import Repository from './Repository';
import User from './User';

// GLOBAL DATA ***************************************************
let userRepository;
let randomUser;
let hydrationRepository;
let timeframe;
let sleepRepository;

// FETCH DATA *****************************************************
// const usersPromise = fetchData('https://fitlit-api.herokuapp.com/api/v1/users');
// const hydrationPromise = fetchData('https://fitlit-api.herokuapp.com/api/v1/hydration');

Promise.all([fetchData("users"), fetchData("hydration"), fetchData("sleep")])
    .then((repos) => {
        console.log(repos);
        setData(repos);
    });

function setData(repos) {
    userRepository = new Repository(repos[0].userData);
    randomUser = getRandomUser(userRepository.data);
    hydrationRepository = new Repository(repos[1].hydrationData);
    randomUser.setUserData(hydrationRepository, 'hydrationData', 'userID');
    timeframe = randomUser.hydrationData[randomUser.hydrationData.length - 1].date;
    sleepRepository = new Repository(repos[2].sleepData);
    randomUser.setUserData(sleepRepository, 'sleepData', 'userID');
    displayUserData();
}

function getRandomUser(users) {
    const randomIndex = Math.floor(Math.random() * users.length);
    const randomUserData = userRepository.findUser(randomIndex, 'id');
    console.log("random user data", randomUserData);
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
const timeframeButtonText = document.querySelector(".timeframe-button-text");
const avgWaterAmount = document.querySelector(".avg-water-amount");
const waterDate = document.querySelector(".water-date");
const waterAmount = document.querySelector(".water-amount");
const avgSleepAmount = document.querySelector(".avg-sleep-amount");
const sleepDate = document.querySelector(".sleep-date");
const sleepAmount = document.querySelector(".sleep-amount");
const avgSleepQuality = document.querySelector(".avg-sleep-quality");
const sleepQual = document.querySelector(".sleep-quality");
const waterInfo = document.querySelector(".water-information");
const timeFrameBtn = document.querySelector(".timeframe-button");
const sleepInfo = document.querySelector(".sleep-information")


// EVENT LISTENERS ************************************************

timeFrameBtn.addEventListener('click', displayWeeklyTimeFrames);

// EVENT HANDLERS *************************************************
function displayUserData() {
    displayUserInfo();
    displayStepData();
    displayWidgetData();
}

function displayUserInfo() {
    console.log("friends", )
    userFirstName.innerText = randomUser.name;
    userAddress.innerText = randomUser.address;
    userEmail.innerText = randomUser.email;
    
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

function displaySleepData(){
  sleepDate.innerText = timeframe;
  sleepAmount.innerText = randomUser.sleepData[randomUser.sleepData.length - 1].hoursSlept;
  sleepQual.innerText = randomUser.sleepData[randomUser.sleepData.length - 1].sleepQuality;
  sleepInfo.innerHTML += `<p><span class="sleep-date">${randomUser.sleepData[randomUser.sleepData.length - 1].date}</span> : <span class="sleep-amount">${randomUser.sleepData[randomUser.sleepData.length - 1].hoursSlept}</span> hrs, <span class="sleep-quality"> ${randomUser.sleepData[randomUser.sleepData.length - 1].sleepQuality}</span>/5 Quality</p>`;
}

function displayHydrationData () {
  waterDate.innerText = timeframe;
  waterAmount.innerText = randomUser.hydrationData[randomUser.hydrationData.length - 1].numOunces;
  waterInfo.innerHTML += `<p><span class="water-date">
  ${randomUser.hydrationData[randomUser.hydrationData.length - 1].date}</span>
   : <span class="water-amount">${randomUser.hydrationData[randomUser.hydrationData.length - 1].numOunces}</span> oz</p>`;
}

function displaySleepWeek (){
  let displaySleepDays = randomUser.getUserWeeklyData(randomUser.sleepData[randomUser.sleepData.length - 8].date, randomUser.sleepData[randomUser.sleepData.length - 1].date, 'sleepData');
        displaySleepDays.forEach((element) => {
          sleepInfo.innerHTML += `<p><span class="sleep-date">${element.date}</span> : <span class="sleep-amount">${element.hoursSlept}</span> hrs, <span class="sleep-quality"> ${element.sleepQuality}</span>/5 Quality</p>`;
        });
}

function setTimeframeDisplays() {
  console.log('HIIIIIIIIII')
    waterInfo.innerHTML = "";
    sleepInfo.innerHTML = "";
    if (timeframe === randomUser.hydrationData[randomUser.hydrationData.length - 1].date) {
      console.log('IF')
        timeframeDisplay.innerText = timeframe;
        timeframeButtonText.innerText = "WEEKLY";
        displaySleepData()
        displayHydrationData()
        // waterDate.innerText = timeframe;
        // sleepDate.innerText = timeframe;
        // waterAmount.innerText = randomUser.hydrationData[randomUser.hydrationData.length - 1].numOunces;
        // waterInfo.innerHTML += `<p><span class="water-date">${randomUser.hydrationData[randomUser.hydrationData.length - 1].date}</span> : <span class="water-amount">${randomUser.hydrationData[randomUser.hydrationData.length - 1].numOunces}</span> oz</p>`;
        // sleepAmount.innerText = randomUser.sleepData[randomUser.sleepData.length - 1].hoursSlept;
        // sleepQual.innerText = randomUser.sleepData[randomUser.sleepData.length - 1].sleepQuality;
        // sleepInfo.innerHTML += `<p><span class="sleep-date">${randomUser.sleepData[randomUser.sleepData.length - 1].date}</span> : <span class="sleep-amount">${randomUser.sleepData[randomUser.sleepData.length - 1].hoursSlept}</span> hrs, <span class="sleep-quality"> ${randomUser.sleepData[randomUser.sleepData.length - 1].sleepQuality}</span>/5 Quality</p>`;
    } else {
      console.log('ELSE')
        timeframeButtonText.innerText = "TODAY'S";
        let displayHydrationDays = randomUser.getUserWeeklyData(randomUser.hydrationData[randomUser.hydrationData.length - 8].date, randomUser.hydrationData[randomUser.hydrationData.length - 1].date, 'hydrationData');
        displayHydrationDays.forEach((element) => {
          waterInfo.innerHTML += `<p><span class="water-date">${element.date}</span> : <span class="water-amount">${element.numOunces}</span> oz</p>`;
        });
        displaySleepWeek()
        // let displaySleepDays = randomUser.getUserWeeklyData(randomUser.sleepData[randomUser.sleepData.length - 8].date, randomUser.sleepData[randomUser.sleepData.length - 1].date, 'sleepData');
        // displaySleepDays.forEach((element) => {
        //   sleepInfo.innerHTML += `<p><span class="sleep-date">${element.date}</span> : <span class="sleep-amount">${element.hoursSlept}</span> hrs, <span class="sleep-quality"> ${element.sleepQuality}</span>/5 Quality</p>`;
        // });
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
