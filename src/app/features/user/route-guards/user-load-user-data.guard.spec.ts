import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { userLoadUserDataGuard } from './user-load-user-data.guard';

describe('userLoadUserDataGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => userLoadUserDataGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
