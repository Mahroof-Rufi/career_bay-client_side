import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { dialogueOpenGuard } from './dialogue-open.guard';

describe('dialogueOpenGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => dialogueOpenGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
