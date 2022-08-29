import { expect } from 'chai';
import User from '../src/User';
import HydrationRepo from '../src/HydrationRepo';
import UserHydration from '../src/UserHydration';

describe('HydrationRepo', () => {

  it('should be a function', () => {
    expect(HydrationRepo).to.be.a('function');
  });

  let userData;
  let user1;
  let user2;
  let user3;
  let hydoRepo;
  let userHydroData;
  

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
    user1 = new User(userData[0]);
    user2 = new User(userData[1]);
    user3 = new User(userData[2]);
    hydroRepo = new HydrationRepo(userData);
  });

  it('should be an instance of HydrationRepo', () => {
    expect(hydroRepo).to.be.an.instanceof(HydrationRepo);
  });
});