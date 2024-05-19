import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { userLoadPostsGuard } from './user-load-posts.guard';

describe('userLoadPostsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => userLoadPostsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
