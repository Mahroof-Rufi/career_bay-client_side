import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { loadEmployerJobsGuard } from './load-employer-jobs.guard';

describe('loadEmployerJobsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => loadEmployerJobsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
