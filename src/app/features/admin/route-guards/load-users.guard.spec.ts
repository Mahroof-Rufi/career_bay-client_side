import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { loadUsersGuard } from './load-users.guard';

describe('loadUsersGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => loadUsersGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
