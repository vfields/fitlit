class User {
  constructor(userData) {
    this.id = userData.id;
    this.name = userData.name;
    this.address = userData.address;
    this.email = userData.email;
    this.strideLength = userData.strideLength;
    this.dailyStepGoal = userData.dailyStepGoal;
    this.friends = userData.friends;
    this.hydrationData;
  }

  findUserFirstName() {
    return this.name.split(' ', 1)[0];
  }
  
  setUserData(repo, dataArray) {
    this[dataArray] = repo.findUser(this.id);
  }

  findAvg(dataArray, measurement) {
    return Math.floor(this[dataArray].reduce((acc, curr) => {
      acc += curr[measurement];
      return acc;
    }, 0) / this[dataArray].length);
  }

  findDataByDate(date, dataArray) {
    return this[dataArray].find(entry => entry.date === date);
  }

  getWeeklyData(startDate, endDate, dataArray) {
    const weeklyData = [];
    for (let i = startDate; i < endDate; i++) {
      weeklyData.push(this[dataArray][i]);
    }

    return weeklyData;
  }
}

export default User;
