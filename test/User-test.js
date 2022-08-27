import { expect } from 'chai';
import User from '../src/User';

describe('User', () => {
  it ('should be a function', () => {
    expect(User).to.be.a('function');
  });

  let userData;
  let user1Data;
  let user2Data;
  let user1;
  let user2;

  beforeEach(() => {
    userData = [
     {
       "id": 1,
       "name": "Tori Fields",
       "address": "426 Cordova Ave NW",
       "email": "victoriaashleyfields@gmail.com",
       "strideLength": 4.3,
       "dailyStepGoal": 10000,
       "friends": [
         16,
         4,
         8
       ]
     },
     {
       "id": 2,
       "name": "Hazel Pablo",
       "address": "A different address",
       "email": "hazel@gmail.com",
       "strideLength": 4.5,
       "dailyStepGoal": 7500,
       "friends": [
         9,
         18,
         24,
         19
       ]
     },
     {
       "id": 3,
       "name": "Matt Press",
       "address": "another different address",
       "email": "matt@yahoo.com",
       "strideLength": 4.4,
       "dailyStepGoal": 5000,
       "friends": [
         19,
         11,
         42,
         33
       ]
     }];
    user1Data = userData[0];
    user2Data = userData[1];
    user1 = new User(user1Data);
    user2 = new User(user2Data);
  })

  it ('should represent a single user', () => {
    expect(user1).to.be.an('object');
    expect(user2).to.be.an('object');
    expect(user1.id).to.equal(1);
    expect(user2.id).to.equal(2);
  });

  it ('should store user properties in each instance from the data file', () => {
    // refactor with Object.keys(user1)!
    expect(user1.id).to.equal(user1Data.id);
    expect(user1.name).to.equal(user1Data.name);
    expect(user1.address).to.equal(user1Data.address);
    expect(user1.email).to.equal(user1Data.email);
    expect(user1.strideLength).to.equal(user1Data.strideLength);
    expect(user1.dailyStepGoal).to.equal(user1Data.dailyStepGoal);
    expect(user1.friends).to.equal(user1Data.friends);
  });

  it ('should return a user first name only', () => {
    expect(user1.findUserFirstName()).to.equal('Tori');
    expect(user2.findUserFirstName()).to.equal('Hazel');
  });

})
