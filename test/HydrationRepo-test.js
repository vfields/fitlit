import { expect } from 'chai';
import User from '../src/User';
import HydrationRepo from '../src/HydrationRepo';

describe('HydrationRepo', () => {

  it('should be a function', () => {
    expect(HydrationRepo).to.be.a('function');
  });

  let user;
  let userHydroData;
  let hydoRepo;

  beforeEach(() => {
    user = ;
    userHydroData = ;
    hydroRepo = ;
  });

  it('should be an instance of HydrationRepo', () => {
    expect(hydroRepo).to.be.an.instanceof(HydrationRepo);
  });
});