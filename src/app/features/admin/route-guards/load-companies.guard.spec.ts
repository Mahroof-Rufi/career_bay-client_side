import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { loadCompaniesGuard } from './load-companies.guard';

describe('loadCompaniesGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => loadCompaniesGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
