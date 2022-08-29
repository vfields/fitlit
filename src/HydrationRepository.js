class HydrationRepository {
  constructor(data) {
    this.data = data;
  }

  findUser(id) {
    return this.data.filter(entry => entry.userID === id);
  }
}

export default HydrationRepository;