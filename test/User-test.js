import { expect } from 'chai';
import User from '../src/User';
import userData from '../src/data/userData';
import Repository from '../src/Repository';
import { hydrationMockData } from '../src/data/hydrationData'; 

describe('User', () => {
  it ('should be a function', () => {
    expect(User).to.be.a('function');
  });

  console.log(userData);

  let user1;
  let user2;

  beforeEach(() => {
    user1 = new User(userData[0]);
    user2 = new User(userData[1]);
  });

  it ('should represent a single user', () => {
    expect(user1).to.be.an('object');
    expect(user2).to.be.an('object');
    expect(user1.id).to.equal(1);
    expect(user2.id).to.equal(2);
  });

  it ('should store user properties in each instance from the data', () => {
    // refactor with Object.keys(user1)!
    expect(user1.id).to.equal(userData[0].id);
    expect(user1.name).to.equal(userData[0].name);
    expect(user1.address).to.equal(userData[0].address);
    expect(user1.email).to.equal(userData[0].email);
    expect(user1.strideLength).to.equal(userData[0].strideLength);
    expect(user1.dailyStepGoal).to.equal(userData[0].dailyStepGoal);
    expect(user1.friends).to.equal(userData[0].friends);
  });

  it ('should return a user first name only', () => {
    expect(user1.findUserFirstName()).to.equal('Luisa');
    expect(user2.findUserFirstName()).to.equal('Jarvis');
  });

  it ('should create a property that holds data for a specific user', () => {
    const hydroRepo = new Repository(hydrationMockData);
    user1.setUserData(hydroRepo, 'hydrationData', 'userID');

    expect(user1).to.have.property('hydrationData');
    expect(user1.hydrationData).to.deep.equal([hydrationMockData[0], hydrationMockData[1], hydrationMockData[2], hydrationMockData[3], hydrationMockData[4], hydrationMockData[5], hydrationMockData[6]]);
  });

  it ('should be able to calculate the average of a given user\'s data')
});
