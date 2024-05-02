import { TestBed } from '@angular/core/testing';
import { CanActivateChildFn } from '@angular/router';

import { employerTokenCheckGuard } from './employer-token-check.guard';

describe('employerTokenCheckGuard', () => {
  const executeGuard: CanActivateChildFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => employerTokenCheckGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
