class HydrationRepository {
  constructor(data) {
    this.hydration = data;
  }

  findUserHydration(id) {
    const userData = this.hydration.filter(entry => entry.id === id);
    return new UserHydration(userData);
  }
}

export default HydrationRepository;