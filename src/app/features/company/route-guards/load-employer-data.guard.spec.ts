import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { loadEmployerDataGuard } from './load-employer-data.guard';

describe('loadEmployerDataGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => loadEmployerDataGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
