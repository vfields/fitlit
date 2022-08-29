import UserHydration from './UserHydration'
class HydrationRepository {
  constructor(data) {
    this.data = data;
  }

  findUser(id) {
    const userData = this.data.filter(entry => entry.userID === id);
    return new UserHydration(userData);
  }
}

export default HydrationRepository;