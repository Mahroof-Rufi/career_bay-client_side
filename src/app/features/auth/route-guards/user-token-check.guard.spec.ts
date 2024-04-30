import { TestBed } from '@angular/core/testing';
import { CanActivateChildFn } from '@angular/router';

import { userTokenCheckGuard } from './user-token-check.guard';

describe('userTokenCheckGuard', () => {
  const executeGuard: CanActivateChildFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => userTokenCheckGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
