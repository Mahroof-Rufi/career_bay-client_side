import { TestBed } from '@angular/core/testing';

import { AuthModalService } from './auth-modal-service.service';

describe('ModalService', () => {
  let service: AuthModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthModalService);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
