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

const getRandomUser = (user) => {
    let randomUser = Math.floor(Math.random() * user.length);
    console.log(user[randomUser]);
}
getRandomUser(userData);

// function getRandomData (){
//     //  randomUser = Math.floor(Math.random()* userData.length)
//     console.log('I AM WORKING') 
// }
// getRandomData()

