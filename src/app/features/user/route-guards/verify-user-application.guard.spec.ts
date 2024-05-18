import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { verifyUserApplicationGuard } from './verify-user-application.guard';

describe('verifyUserApplicationGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => verifyUserApplicationGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
