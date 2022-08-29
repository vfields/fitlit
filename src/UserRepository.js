import User from "./User";

class UserRepository {

  constructor(data) {
    this.data = data;
  }

  findUser(id) {
    const userData = this.data.find(user => user.id === id);
    return new User(userData);
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
