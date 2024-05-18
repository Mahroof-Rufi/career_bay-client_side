import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { loadJobApplicantsGuard } from './load-job-applicants.guard';

describe('loadJobApplicantsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => loadJobApplicantsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
