import { TestBed } from '@angular/core/testing';

import { AuthApiService } from './auth-api-service.service';

describe('AuthApiServiceService', () => {
  let service: AuthApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthApiService);
  });

  xit('should be created', () => {
    // expect(service).toBeTruthy();
  });
});
