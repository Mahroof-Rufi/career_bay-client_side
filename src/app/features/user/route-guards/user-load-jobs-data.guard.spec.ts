import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { userLoadJobsDataGuard } from './user-load-jobs-data.guard';

describe('userLoadJobsDataGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => userLoadJobsDataGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
