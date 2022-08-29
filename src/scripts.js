// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// DEPENDENCIES **************************************************
import './css/styles.css';
import './images/turing-logo.png';
// import userData from './data/users';
import fetchData from './apiCalls';
import UserRepository from './UserRepository';
import HydrationRepository from './HydrationRepo';
// import SleepRepository from './SleepRepository';

// GLOBAL DATA ***************************************************
var userRepository;
var randomUser;
var hydrationRepository;
// var sleepRepository;

// FETCH DATA *****************************************************
const usersPromise = fetchData('https://fitlit-api.herokuapp.com/api/v1/users');
const hydrationPromise = fetchData('https://fitlit-api.herokuapp.com/api/v1/hydration');
const sleepPromise = fetchData('https://fitlit-api.herokuapp.com/api/v1/sleep');

Promise.all([usersPromise, hydrationPromise, sleepPromise])
    .then((repos) => {
        console.log(repos);
        setData(repos);
    });

function setData(repos) {
    userRepository = new UserRepository(repos[0].userData);
    hydrationRepository = new HydrationRepository(repos[1].hydrationData);
    // sleepRepository = new SleepRepository(repos[2].sleepData);
    randomUser = getRandomUser(userRepository.data);
    displayUserData();
}

function getRandomUser(users) {
    const randomIndex = Math.floor(Math.random() * users.length);
    return userRepository.findUser(randomIndex);
}

// DOM ELEMENTS ***************************************************
const userFirstName = document.querySelector(".user-first-name");
const userAddress = document.querySelector(".user-address");
const userEmail = document.querySelector(".user-email");
const userStepGoal = document.querySelector(".user-step-goal");
const repoStepGoal = document.querySelector(".repo-step-goal");
const userStrideLength = document.querySelector(".user-stride-length");
const userFriends = document.querySelector(".friend-names");
const avgWaterAmount = document.querySelector(".avg-water-amount");

// EVENT LISTENERS ************************************************

// EVENT HANDLERS *************************************************
function displayUserData() {
    displayUserInfo();
    displayStepData();
    displayHydrationData();
}

function displayUserInfo() {
    userFirstName.innerText = randomUser.name;
    userAddress.innerText = randomUser.address;
    userEmail.innerText = randomUser.email; 
}

function displayStepData() {
    userStepGoal.innerText = randomUser.dailyStepGoal;
    repoStepGoal.innerText = userRepository.calculateAvgStepGoal();
    userStrideLength.innerText = randomUser.strideLength;
}

function displayHydrationData() {
    const userHydrationData = hydrationRepository.findUser(randomUser.id);
    avgWaterAmount.innerText = userHydrationData.avgHydration();
}