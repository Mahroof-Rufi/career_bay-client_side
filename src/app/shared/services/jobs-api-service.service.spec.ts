import { TestBed } from '@angular/core/testing';

import { JobsApiServiceService } from './jobs-api-service.service';

describe('JobsApiServiceService', () => {
  let service: JobsApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobsApiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
