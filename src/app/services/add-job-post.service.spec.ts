import { TestBed } from '@angular/core/testing';

import { AddJobPostService } from './add-job-post.service';

describe('AddJobPostService', () => {
  let service: AddJobPostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddJobPostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
