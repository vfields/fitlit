import { expect } from 'chai';
import Repository from '../src/Repository';
import {hydrationMockData } from '../src/data/hydrationData';
import userData from '../src/data/userData';


describe('Repository', () => {
  it('should be a function', function () {
    expect(Repository).to.be.a('function');
  });

  let userRepo;
  let hydrationRepo; 

  beforeEach(() => {
     userRepo = new Repository(userData);
     hydrationRepo = new Repository(hydrationMockData)
  });

  it ('should be an instance of Repository', () => {
    expect(userRepo).to.be.an.instanceOf(Repository);
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
