import { expect } from 'chai';
import User from '../src/User';
import userData from '../src/data/users';

describe('User', () => {
  it ('should be a function', () => {
    expect(User).to.be.a('function');
  })

  let user1Data;
  let user2Data;
  let user1;
  let user2;

  beforeEach(() => {
    user1Data = userData[0];
    user2Data = userData[1];
    user1 = new User(user1Data);
    user2 = new User(user2Data);
  })

  it ('should represent a single user', () => {
    expect(user1).to.be.an('object');
  });

  it.skip ('should store user properties in each instance from the data file', () => {
    // test each property = user object property;
  });

  it ('should return a user first name only', () => {
    expect(user1.findUserFirstName()).to.equal('Luisa');
    expect(user2.findUserFirstName()).to.equal('Jarvis');
  });

})
