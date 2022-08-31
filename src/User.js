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
    const indexOne = datesOnlyArray.indexOf(startDate);
    const indexTwo = datesOnlyArray.indexOf(endDate);
    const weekArray = this[dataArray].slice(indexOne, indexTwo);
    return weekArray;
  }
}

export default User;
