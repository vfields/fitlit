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
var userRepository;
var randomUser;
var hydrationRepository;

// FETCH DATA *****************************************************
const usersPromise = fetchData('https://fitlit-api.herokuapp.com/api/v1/users');
const hydrationPromise = fetchData('https://fitlit-api.herokuapp.com/api/v1/hydration');

Promise.all([usersPromise, hydrationPromise])
    .then((repos) => {
        console.log(repos);
        setData(repos);
    });

function setData(repos) {
    userRepository = new Repository(repos[0].userData);
    randomUser = getRandomUser(userRepository.data);
    hydrationRepository = new Repository(repos[1].hydrationData);
    randomUser.setUserData(hydrationRepository, 'hydrationData', 'userID');

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
    repoStepGoal.innerText = userRepository.calcRepoAvg('dailyStepGoal');
    userStrideLength.innerText = randomUser.strideLength;
}

function displayHydrationData() {
    avgWaterAmount.innerText = randomUser.calcUserAvg('hydrationData', 'numOunces');
}