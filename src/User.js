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
    const weekDataRepo = new Repository(weekArray);
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

export default User;
