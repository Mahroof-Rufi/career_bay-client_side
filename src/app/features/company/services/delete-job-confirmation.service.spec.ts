import { TestBed } from '@angular/core/testing';

import { DeleteJobConfirmationService } from './delete-job-confirmation.service';

describe('DeleteJobConfirmationService', () => {
  let service: DeleteJobConfirmationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteJobConfirmationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
