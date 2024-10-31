import { TestBed } from '@angular/core/testing';

import { ApplicationsConfirmationModalService } from './applications-confirmation-modal.service';

describe('ApplicationsConfirmationModalService', () => {
  let service: ApplicationsConfirmationModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicationsConfirmationModalService);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
