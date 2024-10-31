import { TestBed } from '@angular/core/testing';

import { UserAPIServiceService } from './user-api-service.service';

describe('UserAPIServiceService', () => {
  let service: UserAPIServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAPIServiceService);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
