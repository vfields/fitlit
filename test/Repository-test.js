import { expect } from 'chai';
import Repository from '../src/Repository';
import hydrationData from '../src/data/hydrationData';
import userData from '../src/data/userData';


describe('Repository', () => {
  it('should be a function', function () {
    expect(Repository).to.be.a('function');
  });

  let userRepo;
  let hydrationRepo;

  beforeEach(() => {
     userRepo = new Repository(userData);
     hydrationRepo = new Repository(hydrationData);
  });

  it ('should be an instance of Repository', () => {
    expect(userRepo).to.be.an.instanceOf(Repository);
  });

  it ('should store any repo data', () => {
    expect(userRepo.data).to.deep.equal(userData);
    expect(hydrationRepo.data).to.deep.equal(hydrationData);
  });

  it ('should be able to find user data given a user ID', () => {
    const user1 = userRepo.findUser(1 ,'id');
    const user2 = userRepo.findUser(2, 'id');
    const user3 = hydrationRepo.findUser(1, 'userID');

    expect(user1[0]).to.equal(userData[0]);
    expect(user2[0]).to.equal(userData[1]);
    expect(user3[0]).to.equal(hydrationData[0]);
  });

  it ('should be able to calculate the average of a given property amongst all users', () => {
    const stepGoalAvg = userRepo.calcRepoAvg('dailyStepGoal');
    const numOuncesAvg = hydrationRepo.calcRepoAvg('numOunces');

    expect(stepGoalAvg).to.equal(7000);
    expect(numOuncesAvg).to.equal(39);
  });
});
