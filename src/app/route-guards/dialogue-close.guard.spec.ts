import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { dialogueCloseGuard } from './dialogue-close.guard';

describe('dialogueCloseGuard', () => {
  const executeGuard: CanDeactivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => dialogueCloseGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
