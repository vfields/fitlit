class UserHydration {
  constructor(userData) {
    this.userData = userData;
  }

  avgHydration() {
    return this.userData.reduce((acc, curr, index, dataArray) => {
      if (index === dataArray -1) {
        return (acc + curr) / dataArray.length;
      }
      acc += curr.numOunces;
      return acc;
    }, 0);
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