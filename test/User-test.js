import { expect } from 'chai';
import User from '../src/User';
import userData from '../src/data/userData';
import Repository from '../src/Repository';
import hydrationMockData from '../src/data/hydrationData';
import { sleepData } from '../src/data/sleepData';

describe('User', () => {
  it ('should be a function', () => {
    expect(User).to.be.a('function');
  });

  let user1;
  let user2;
  let hydroRepo;
  let sleepRepo;

  beforeEach(() => {
    user1 = new User(userData[0]);
    user2 = new User(userData[1]);
    hydroRepo = new Repository(hydrationMockData);
    sleepRepo = new Repository(sleepData);
  });

  it ('should represent a single user', () => {
    expect(user1).to.be.an('object');
    expect(user2).to.be.an('object');
    expect(user1.id).to.equal(1);
    expect(user2.id).to.equal(2);
  });

  it ('should store user properties in each instance from the data', () => {
    Object.keys(user1)
      .forEach(key => {
        expect(user1[key]).to.equal(userData[0][key]);
      });
  });

  it ('should return a user first name only', () => {
    expect(user1.findUserFirstName()).to.equal('Luisa');
    expect(user2.findUserFirstName()).to.equal('Jarvis');
  });

  it ('should create a property that holds data for a specific user', () => {
    user1.setUserData(hydroRepo, 'hydrationData', 'userID');

    expect(user1).to.have.property('hydrationData');
    expect(user1.hydrationData).to.deep.equal([hydrationMockData[0], hydrationMockData[1], hydrationMockData[2], hydrationMockData[3], hydrationMockData[4], hydrationMockData[5], hydrationMockData[6], hydrationMockData[7]]);
  });

  it ('should be able to calculate the average of a given user\'s data', () => {
    user1.setUserData(hydroRepo, 'hydrationData', 'userID');
    user1.setUserData(sleepRepo, 'sleepData', 'userID');

    expect(user1.calcUserAvg('hydrationData', 'numOunces')).to.equal(36);
    expect(user1.calcUserAvg('sleepData', 'hoursSlept')).to.equal(10);
  });

  it ('should be able to find the data for a user when provided a date', () => {
    user1.setUserData(hydroRepo, 'hydrationData', 'userID');
    user1.setUserData(sleepRepo, 'sleepData', 'userID');

    expect(user1.findUserDataByDate('2019/06/15', 'hydrationData')).to.deep.equal(hydrationMockData[0]);
    expect(user1.findUserDataByDate('2019/06/15', 'sleepData')).to.deep.equal(sleepData[0]);
  });

  it ('should be able to return the weekly data for a user', () => {
    user1.setUserData(hydroRepo, 'hydrationData', 'userID');
    user1.setUserData(sleepRepo, 'sleepData', 'userID');

    expect(user1.getUserWeeklyData('2019/06/15', '2019/06/21', 'hydrationData')).to.deep.equal([hydrationMockData[0], hydrationMockData[1], hydrationMockData[2], hydrationMockData[3], hydrationMockData[4], hydrationMockData[5], hydrationMockData[6]]);
    expect(user1.getUserWeeklyData('2019/06/15', '2019/06/21', 'sleepData')).to.deep.equal([sleepData[0], sleepData[1], sleepData[2], sleepData[3], sleepData[4], sleepData[5], sleepData[6]]);
  });
});
