import { TestBed } from '@angular/core/testing';

import { commonAPIService } from './common-api-service.service';

describe('commonAPIService', () => {
  let service: commonAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(commonAPIService);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
