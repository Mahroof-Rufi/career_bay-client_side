import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { validateUserTokenGuard } from './validate-user-token.guard';

describe('validateUserTokenGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => validateUserTokenGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
