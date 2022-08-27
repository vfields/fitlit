class UserRepository {

  constructor(data) {
    this.data = data;
  }

  findUserData(id) {
    return this.data.find(user => user.id === id);
  }

  calculateAvgStepGoal() {
    return this.data
      .map(user => user.dailyStepGoal)
      .reduce((acc, stepGoal, index, dataArray) => {
        if (index === dataArray.length - 1) {
          return (acc + stepGoal) / dataArray.length;
        }
        acc = acc + stepGoal;
        return acc;
      }, 0)
  }

}

export default UserRepository;
