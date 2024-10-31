import { TestBed } from '@angular/core/testing';

import { EmployerEditProfileModalService } from './employer-edit-profile-modal.service';

describe('EmployerEditProfileModalService', () => {
  let service: EmployerEditProfileModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployerEditProfileModalService);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
