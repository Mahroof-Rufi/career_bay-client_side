import { TestBed } from '@angular/core/testing';

import { ApplyJobConfirmationService } from './apply-job-confirmation.service';

describe('ApplyJobConfirmationService', () => {
  let service: ApplyJobConfirmationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplyJobConfirmationService);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
