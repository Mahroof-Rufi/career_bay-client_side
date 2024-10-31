import { TestBed } from '@angular/core/testing';

import { AdminApiServiceService } from './admin-api-service.service';

describe('AdminApiServiceService', () => {
  let service: AdminApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminApiServiceService);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
