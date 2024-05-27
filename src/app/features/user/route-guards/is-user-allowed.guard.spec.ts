import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { isUserAllowedGuard } from './is-user-allowed.guard';

describe('isUserAllowedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => isUserAllowedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
