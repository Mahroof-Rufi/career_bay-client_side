import { TestBed } from '@angular/core/testing';

import { ApplicationsConfirmationModalService } from './applications-confirmation-modal.service';

describe('ApplicationsConfirmationModalService', () => {
  let service: ApplicationsConfirmationModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicationsConfirmationModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
