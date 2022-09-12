class Repository {
  constructor(data) {
    this.data = data;
  }

  findUser(id, property) {
    return this.data.filter(user => user[property] === id);
  }

  calcRepoAvg(property) {
    return this.data
      .reduce((acc, curr, index, dataArray) => {
        if (index === dataArray.length - 1) {
          return (acc + curr[property]) / dataArray.length;
        }
        acc += curr[property];
        return acc;
      }, 0);
  }
}

export default Repository;
