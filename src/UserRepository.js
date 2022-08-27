class UserRepository {

  constructor(data) {
    this.data = data;
  }

  findUserData(id) {
    return this.data.find(user => user.id === id);
  }

  calculateAvgStepGoal() {

  }

}

export default UserRepository;
