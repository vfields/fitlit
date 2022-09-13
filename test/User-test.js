import { expect } from 'chai';
import User from '../src/User';
import Repository from '../src/Repository';
import userData from '../src/data/userData';
import hydrationData from '../src/data/hydrationData';
import sleepData from '../src/data/sleepData';
import activityData from '../src/data/activityData';

describe('User', () => {
  it ('should be a function', () => {
    expect(User).to.be.a('function');
  });

  let user1;
  let user2;
  let hydroRepo;
  let sleepRepo;
  let activityRepo;

  beforeEach(() => {
    user1 = new User(userData[0]);
    user2 = new User(userData[1]);
    hydroRepo = new Repository(hydrationData);
    sleepRepo = new Repository(sleepData);
    activityRepo = new Repository(activityData);
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
    Object.keys(user2)
      .forEach(key => {
        expect(user2[key]).to.equal(userData[1][key]);
      });
  });

  it ('should return a user first name only', () => {
    expect(user1.findUserFirstName()).to.equal('Luisa');
    expect(user2.findUserFirstName()).to.equal('Jarvis');
  });

  it ('should create a property that holds data for a specific user', () => {
    user1.setUserData(hydroRepo, 'hydrationData', 'userID');
    user2.setUserData(sleepRepo, 'sleepData', 'userID');

    expect(user1).to.have.property('hydrationData');
    expect(user2).to.have.property('sleepData');
    expect(user1.hydrationData).to.deep.equal([hydrationData[0], hydrationData[1], hydrationData[2], hydrationData[3], hydrationData[4], hydrationData[5], hydrationData[6], hydrationData[7]]);
    expect(user2.sleepData).to.deep.equal([sleepData[7]]);
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

    expect(user1.findUserDataByDate('2019/06/15', 'hydrationData')).to.deep.equal(hydrationData[0]);
    expect(user1.findUserDataByDate('2019/06/15', 'sleepData')).to.deep.equal(sleepData[0]);
  });

  it ('should be able to return the weekly data for a user', () => {
    user1.setUserData(hydroRepo, 'hydrationData', 'userID');
    user1.setUserData(sleepRepo, 'sleepData', 'userID');

    expect(user1.getUserWeeklyData('2019/06/15', '2019/06/21', 'hydrationData')).to.deep.equal([hydrationData[0], hydrationData[1], hydrationData[2], hydrationData[3], hydrationData[4], hydrationData[5], hydrationData[6]]);
    expect(user1.getUserWeeklyData('2019/06/15', '2019/06/21', 'sleepData')).to.deep.equal([sleepData[0], sleepData[1], sleepData[2], sleepData[3], sleepData[4], sleepData[5], sleepData[6]]);
  });

  it ('given a specific date, should return the miles a user has walked based on their number of steps', () => {
    user1.setUserData(activityRepo, 'activityData', 'userID');

    expect(user1.calcMiles('2019/06/15')).to.equal(3.06);
  });

  it ('this is my test block', () => {
    user1.setUserData(hydroRepo, 'hydrationData', 'userID');
    user1.setUserData(sleepRepo, 'sleepData', 'userID');
    user1.setUserData(activityRepo, 'activityData', 'userID');

    console.log(user1.calcDailyMinutesActive('2019/06/15'));
    console.log(user1.avgWeeklyMinutesActive("2019/06/15", "2019/06/21"));
    console.log('daily step goal = ', user1.dailyStepGoal, 'so this 3754 step day returns', user1.meetStepGoal("2019/06/15"));
    console.log('daily step goal = ', user1.dailyStepGoal, 'so this 12000 step day returns', user1.meetStepGoal("2019/06/16"));
    console.log(user1.findStepGoalExceededDays());
  });
});
