import { expect } from 'chai';
import UserRepository from '../src/UserRepository';
import userData from '../src/data/users';

describe('User Repository', () => {
  it('should be a function', function () {
    expect(UserRepository).to.be.a('function');
  });

  let userRepo;

  beforeEach(() => {
    userRepo = new UserRepository(userData);
  });

  it ('should be an instance of UserRepository', () => {
    expect(userRepo).to.be.an.instanceOf(UserRepository);
  });

  it ('should store user data', () => {
    expect(userRepo.data).to.deep.equal(userData);
  });

  it.skip ('should be able to find user data given a user ID', () => {
    console.log('findUserData(1)', userRepo.findUserData(1));
    console.log('userData[0]', userData[0]);

    console.log('findUserData(2)', userRepo.findUserData(2));
    console.log('userData[1]', userData[1]);

    // expect(userRepo.findUserData(1)).to.equal(userData[0]); throws a webpack error...
  });

  it ('should be able to calculate the average step goal amongst all users', () => {
    const average = userData
      .map(user => user.dailyStepGoal)
      .reduce((acc, stepGoal, index, userDataArray) => {
        if (index === userDataArray.length - 1) {
          return (acc + stepGoal) / userDataArray.length;
        }
        acc = acc + stepGoal;
        return acc;
      }, 0);

      // not sure if that's the right way to go about testing this?

    expect(userRepo.calculateAvgStepGoal()).to.equal(average);
  })
});
