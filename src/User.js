import Repository from './Repository';

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
    return this[dataArray].find(entry => entry.date === date);
  }

  getUserWeeklyData(startDate, endDate, dataArray) {
    const datesOnlyArray = this[dataArray].map(dataObject => dataObject.date);
    return this[dataArray].slice(datesOnlyArray.indexOf(startDate), datesOnlyArray.indexOf(endDate) + 1);
  }

  calcMiles(date) {
     const totalDistance = this.findUserDataByDate(date, 'activityData').numSteps * this.strideLength / 5280
     return Math.round(totalDistance * 100) / 100;
   }

  calcDailyMinutesActive(date) {
    return this.findUserDataByDate(date, 'activityData').minutesActive;
  }

 avgWeeklyMinutesActive(startDate, endDate) {
   const weekArray = this.getUserWeeklyData(startDate, endDate, 'activityData');
   const weekDataRepo = new Repository(weekArray);
   return Math.round(weekDataRepo.calcRepoAvg('minutesActive') * 100) / 100;

 /* or we can do the below code without importing Reposiory!
 // we'd just need to add the Math.round bit!
   return weekArray.reduce((acc, curr, index, dataArray) => {
     if (index === dataArray.length - 1) {
       return (acc + curr.minutesActive) / dataArray.length;
     }
     acc += curr.minutesActive;
     return acc;
   }, 0);
*/

  }

  meetStepGoal(date) {
    if (this.findUserDataByDate(date, 'activityData').numSteps >= this.dailyStepGoal) {
      return true;
    }
    return false;
  }

  findStepGoalExceededDays() {
    return this.activityData
      .reduce((acc, curr) => {
        if (this.dailyStepGoal < curr.numSteps) {
          acc.push(curr.date);
        }
        return acc;
      }, [])
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

export default User;
