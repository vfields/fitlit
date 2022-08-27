import { expect } from 'chai';
import UserRepository from '../src/UserRepository';

describe('User Repository', () => {
  it('should be a function', function () {
    expect(UserRepository).to.be.a('function');
  });

  let userData;
  let userRepo;

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
     userRepo = new UserRepository(userData);
  });

  it ('should be an instance of UserRepository', () => {
    expect(userRepo).to.be.an.instanceOf(UserRepository);
  });

  it ('should store user data', () => {
    expect(userRepo.data).to.deep.equal(userData);
  });

  it ('should be able to find user data given a user ID', () => {
    expect(userRepo.findUserData(1)).to.equal(userData[0]);
    expect(userRepo.findUserData(2)).to.equal(userData[1]);
  });

  it ('should be able to calculate the average step goal amongst all users', () => {
    expect(userRepo.calculateAvgStepGoal()).to.equal(7500);
  })
});
