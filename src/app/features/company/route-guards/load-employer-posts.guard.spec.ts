import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { loadEmployerPostsGuard } from './load-employer-posts.guard';

describe('loadEmployerPostsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => loadEmployerPostsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
