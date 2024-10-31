import { TestBed } from '@angular/core/testing';

import { AddJobPostService } from './add-job-post-modal.service';

describe('AddJobPostService', () => {
  let service: AddJobPostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddJobPostService);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
