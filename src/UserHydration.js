class UserHydration {
  constructor(userData) {
    this.userData = userData;
  }

  avgHydration() {
    return Math.floor(this.userData.reduce((acc, curr, index, dataArray) => {
      acc += curr.numOunces;
      return acc;
    }, 0) / this.userData.length);
  }

  findHydrationByDate(date) {
    return this.userData.find(entry => entry.date === date);
  }

  getWeeklyHydration() {
    const weeklyHydrationData = [];
    for (let i = 0; i < 7; i++) {
      weeklyHydrationData.push(this.userData[i]);
    }
    return weeklyHydrationData;
  }
}

export default UserHydration;