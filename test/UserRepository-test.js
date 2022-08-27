import { expect } from 'chai';
import UserRepository from '../src/UserRepository';
import userData from '../src/data/users';

describe('User Repository', () => {
  it('should be a function', function () {
    expect(UserRepository).to.be.a('function');
  });

  it ('should store user data', () => {
    console.log(userData);
  })
});
