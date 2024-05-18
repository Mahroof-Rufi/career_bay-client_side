import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { loadAppliedJobsGuard } from './load-applied-jobs.guard';

describe('loadAppliedJobsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => loadAppliedJobsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
