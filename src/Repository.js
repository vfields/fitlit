class Repository {
  constructor(data) {
    this.data = data;
  }

  findUser(id, property) {
    return this.data.filter(user => user[property] === id);
  }

  calcRepoAvg(property, data = this.data) {
    return data
      .reduce((acc, curr, index, dataArray) => {
        if (index === dataArray.length - 1) {
          return (acc + curr[property]) / dataArray.length;
        }
        acc += curr[property];
        return acc;
      }, 0);
  }

  calcRepoAvgByDate(property, date) {
    const dateArray = this.data
      .reduce((acc, curr) => {
        if (curr.date === date) {
          acc.push(curr);
        }
        return acc;
      }, []);

    return this.calcRepoAvg(property, dateArray);
  }
}

export default Repository;
