import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { adminTokenCheckGuard } from './admin-token-check.guard';

describe('adminTokenCheckGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => adminTokenCheckGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
