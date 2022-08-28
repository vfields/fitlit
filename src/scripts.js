// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

console.log(userData,"<>>>>userData")
// An example of how you tell webpack to use a CSS file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

console.log('This is the JavaScript entry file - your code begins here.');

// An example of how you tell webpack to use a JS file

import userData from './data/users';

import UserRepository from './UserRepository';

const userFirstName = document.querySelector(".user-first-name");
const userAddress = document.querySelector(".user-address");
const userEmail = document.querySelector(".user-email");

const getRandomUser = (user) => {
    let randomUser = Math.floor(Math.random() * user.length);
    return user[randomUser];
}
const randomUser = getRandomUser(userData);

const displayUserData = () => {
userFirstName.innerText = randomUser.name;
userAddress.innerText = randomUser.address;
userEmail.innerText = randomUser.email; 
}

displayUserData()
// function getRandomData (){
//     //  randomUser = Math.floor(Math.random()* userData.length)
//     console.log('I AM WORKING') 
// }
// getRandomData()

