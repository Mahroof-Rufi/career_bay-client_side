import { TestBed } from '@angular/core/testing';

import { UserProfileEditModalService } from './user-profile-edit-modal.service';

describe('UserProfileEditModalService', () => {
  let service: UserProfileEditModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserProfileEditModalService);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
