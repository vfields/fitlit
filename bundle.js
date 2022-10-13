/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "displayDataForm": () => (/* binding */ displayDataForm)
/* harmony export */ });
/* harmony import */ var _css_styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _apiCalls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _Repository__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _User__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8);
// DEPENDENCIES **************************************************





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
Promise.all([(0,_apiCalls__WEBPACK_IMPORTED_MODULE_1__.fetchData)("users"), (0,_apiCalls__WEBPACK_IMPORTED_MODULE_1__.fetchData)("hydration"), (0,_apiCalls__WEBPACK_IMPORTED_MODULE_1__.fetchData)("sleep"), (0,_apiCalls__WEBPACK_IMPORTED_MODULE_1__.fetchData)("activity")])
  .then((repos) => {
    setData(repos);
  });

function setData(repos) {
  userRepository = new _Repository__WEBPACK_IMPORTED_MODULE_2__["default"](repos[0].userData);
  randomUser = getRandomUser(userRepository.data);
  hydrationRepository = new _Repository__WEBPACK_IMPORTED_MODULE_2__["default"](repos[1].hydrationData);
  randomUser.setUserData(hydrationRepository, 'hydrationData', 'userID');
  sleepRepository = new _Repository__WEBPACK_IMPORTED_MODULE_2__["default"](repos[2].sleepData);
  randomUser.setUserData(sleepRepository, 'sleepData', 'userID');
  activityRepository = new _Repository__WEBPACK_IMPORTED_MODULE_2__["default"](repos[3].activityData);
  randomUser.setUserData(activityRepository, 'activityData', 'userID');
  setDates();

  displayUserData();
}

function getRandomUser(users) {
  const randomIndex = Math.floor(Math.random() * users.length);
  const randomUserData = userRepository.findUser(randomIndex, 'id');
  return new _User__WEBPACK_IMPORTED_MODULE_3__["default"](randomUserData[0]);
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

  (0,_apiCalls__WEBPACK_IMPORTED_MODULE_1__.postData)(`${dataChoices.value}`, userInputData);
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




/***/ }),
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* VARIABLES ******************************************** */\n:root {\n  --pink: #F6019D;\n}\n\n/* BODY ************************************************* */\nbody,\nhtml {\n  color: white;\n  font-family: open-sans, sans-serif;\n  background: linear-gradient(40deg, rgb(2, 0, 36) 0%, rgb(101, 13, 137) 38%, rgb(0, 212, 255) 100%);\n}\n\nbody {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-gap: 20px;\n  padding: 10px;\n  text-align: center;\n}\n\nheader {\n  grid-column: span 2;\n}\n\n.friends-section {\n  grid-row: span 4;\n}\n\n.controls-section {\n  grid-column: span 2;\n}\n\n.steps-section {\n  grid-column: span 2;\n}\n\n/* TEXT ************************************************ */\nh1,\nh2,\nh3 {\n  color: var(--pink);\n  font-family: \"Masiku\", sans-serif;\n  text-align: center;\n}\n\nspan {\n  color: var(--pink);\n}\n\n/* SHARED WIDGET PROPERTIES **************************** */\nheader,\nsection,\nbutton {\n  padding: 8px;\n  border-radius: 10px;\n  background-color: rgb(2, 0, 36);\n}\n\nbutton {\n  color: white;\n  border: 2px solid var(--pink);\n  filter: drop-shadow(0 0 0.75rem var(--pink));\n  margin: 10px;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  -webkit-transition-duration: 0.3s;\n  transition-duration: 0.3s;\n  -webkit-transition-property: transform;\n  transition-property: transform;\n}\n\nbutton:hover,\nbutton:focus {\n  -webkit-transform: scale(1.1);\n  transform: scale(1.1);\n}\n\n/* FORM ************************************************ */\ninput:invalid {\n  border: 2px solid red;\n}\n\ninput:valid {\n  border: 2px solid lightgreen;\n}\n\n/* GENERAL ********************************************* */\n.hidden {\n  display: none;\n}", "",{"version":3,"sources":["webpack://./src/css/styles.css"],"names":[],"mappings":"AAAA,2DAAA;AACA;EACE,eAAA;AACF;;AAEA,2DAAA;AACA;;EAEE,YAAA;EACA,kCAAA;EACA,kGAAA;AACF;;AAEA;EACE,aAAA;EACA,qCAAA;EACA,cAAA;EACA,aAAA;EACA,kBAAA;AACF;;AAEA;EACE,mBAAA;AACF;;AAEA;EACE,gBAAA;AACF;;AAEA;EACE,mBAAA;AACF;;AAEA;EACE,mBAAA;AACF;;AAEA,0DAAA;AACA;;;EAGE,kBAAA;EACA,iCAAA;EACA,kBAAA;AACF;;AAEA;EACE,kBAAA;AACF;;AAEA,0DAAA;AACA;;;EAGE,YAAA;EACA,mBAAA;EACA,+BAAA;AACF;;AAEA;EACE,YAAA;EACA,6BAAA;EACA,4CAAA;EACA,YAAA;EACA,iDAAA;EACA,yCAAA;EACA,iCAAA;EACA,yBAAA;EACA,sCAAA;EACA,8BAAA;AACF;;AAEA;;EAEE,6BAAA;EACA,qBAAA;AACF;;AAEA,0DAAA;AACA;EACE,qBAAA;AACF;;AAEA;EACE,4BAAA;AACF;;AAEA,0DAAA;AACA;EACE,aAAA;AACF","sourcesContent":["/* VARIABLES ******************************************** */\n:root {\n  --pink: #F6019D;\n}\n\n/* BODY ************************************************* */\nbody, \nhtml {\n  color: white;\n  font-family: open-sans, sans-serif;\n  background: linear-gradient(40deg, rgba(2,0,36,1) 0%, rgba(101,13,137,1) 38%, rgba(0,212,255,1) 100%);\n}\n\nbody {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-gap: 20px;\n  padding: 10px;\n  text-align: center;\n}\n\nheader {\n  grid-column: span 2;\n}\n\n.friends-section {\n  grid-row: span 4;\n}\n\n.controls-section {\n  grid-column: span 2;\n}\n\n.steps-section {\n  grid-column: span 2;\n}\n\n/* TEXT ************************************************ */\nh1,\nh2,\nh3 {\n  color: var(--pink);\n  font-family: 'Masiku', sans-serif;\n  text-align: center;\n}\n\nspan {\n  color: var(--pink);\n}\n\n/* SHARED WIDGET PROPERTIES **************************** */\nheader,\nsection,\nbutton {\n  padding: 8px;\n  border-radius: 10px;\n  background-color: rgb(2,0,36,1);\n}\n\nbutton {\n  color: white;\n  border: 2px solid var(--pink);\n  filter: drop-shadow(0 0 0.75rem var(--pink));\n  margin: 10px;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  -webkit-transition-duration: 0.3s;\n  transition-duration: 0.3s;\n  -webkit-transition-property: transform;\n  transition-property: transform;\n}\n\nbutton:hover, \nbutton:focus {\n  -webkit-transform: scale(1.1);\n  transform: scale(1.1);\n}\n\n/* FORM ************************************************ */\ninput:invalid {\n  border: 2px solid red;\n}\n\ninput:valid {\n  border: 2px solid lightgreen;\n}\n\n/* GENERAL ********************************************* */\n.hidden {\n  display: none;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 4 */
/***/ ((module) => {



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 5 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fetchData": () => (/* binding */ fetchData),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
/* harmony import */ var _scripts_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);


function fetchData(repo) {
  return fetch(`http://localhost:3001/api/v1/${repo}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Not a 200 status');
        }
        return response.json();
      })
      .catch(error => {
        alert('Oops, something went wrong. Try refreshing your page.');
      });
}

function postData(repo, userData) {
  const requestData = {
      method:'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    };

  return fetch(`http://localhost:3001/api/v1/${repo}`, requestData)
    .then(response => {
      if (!response.ok) {
        throw new Error('Not a 200 status');
      }
      alert('Information submitted');
      (0,_scripts_js__WEBPACK_IMPORTED_MODULE_0__.displayDataForm)();
      return response.json();
    })
    .catch(error => {
      alert('Oops, something went wrong. Try again later');
    });
}




/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Repository {
  constructor(data) {
    this.data = data;
  }

  findUser(id, property) {
    return this.data.filter(user => user[property] === id);
  }

  calcRepoAvg(property, data = this.data) {
    return data
      .reduce((acc, curr, index, dataArray) => {
        if (index === dataArray.length - 1) {
          return (acc + curr[property]) / dataArray.length;
        }
        acc += curr[property];
        return acc;
      }, 0);
  }

  calcRepoAvgByDate(property, date) {
    const dateArray = this.data
      .reduce((acc, curr) => {
        if (curr.date === date) {
          acc.push(curr);
        }
        return acc;
      }, []);

    return this.calcRepoAvg(property, dateArray);
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Repository);


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Repository__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);


class User {
  constructor(userData) {
    this.id = userData.id;
    this.name = userData.name;
    this.address = userData.address;
    this.email = userData.email;
    this.strideLength = userData.strideLength;
    this.dailyStepGoal = userData.dailyStepGoal;
    this.friends = userData.friends;
  }

  findUserFirstName() {
    return this.name.split(' ', 1)[0];
  }

  setUserData(repo, dataArray, property) {
    this[dataArray] = repo.findUser(this.id, property);
  }

  calcUserAvg(dataArray, measurement) {
    return Math.floor(this[dataArray].reduce((acc, curr) => {
      acc += curr[measurement];
      return acc;
    }, 0) / this[dataArray].length);
  }

  findUserDataByDate(date, dataArray) {
    if (this[dataArray].find(entry => entry.date === date)) {
      return this[dataArray].find(entry => entry.date === date);
    }
    return 0;
  }

  getUserWeeklyData(startDate, endDate, dataArray) {
    const datesOnlyArray = this[dataArray].map(dataObject => dataObject.date);
    return this[dataArray].slice(datesOnlyArray.indexOf(startDate), datesOnlyArray.indexOf(endDate) + 1);
  }

  calcDistance(date) {
     const totalDistance = this.findUserDataByDate(date, 'activityData').numSteps * this.strideLength / 5280;
     return Math.round(totalDistance * 100) / 100;
   }

  calcUserWeeklyAvg(startDate, endDate) {
    const weekArray = this.getUserWeeklyData(startDate, endDate, 'activityData');
    const weekDataRepo = new _Repository__WEBPACK_IMPORTED_MODULE_0__["default"](weekArray);
    return Math.round(weekDataRepo.calcRepoAvg('minutesActive') * 100) / 100;
  }

  metStepGoal(date) {
    return this.findUserDataByDate(date, 'activityData').numSteps >= this.dailyStepGoal;
  }

  findDaysExceedingStepGoal() {
    return this.activityData
      .reduce((acc, curr) => {
        if (this.dailyStepGoal < curr.numSteps) {
          acc.push(curr.date);
        }
        return acc;
      }, []);
  }

  findStairClimbingRecord() {
    return this.activityData
      .reduce((acc, curr) => {
        if (acc.flightsOfStairs > curr.flightsOfStairs) {
          return acc;
        }
        return curr;
      }).flightsOfStairs;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (User);


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	
/******/ })()
;
//# sourceMappingURL=bundle.js.map