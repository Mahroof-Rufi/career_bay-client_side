import { TestBed } from '@angular/core/testing';

import { EmployerApiServiceService } from './employer-api-service.service';

describe('EmployerApiServiceService', () => {
  let service: EmployerApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployerApiServiceService);
  });

  xit('should be created', () => {
  });
});
