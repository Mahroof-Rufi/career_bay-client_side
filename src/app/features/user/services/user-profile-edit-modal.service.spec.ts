import { TestBed } from '@angular/core/testing';

import { UserProfileEditModalService } from './user-profile-edit-modal.service';

describe('UserProfileEditModalService', () => {
  let service: UserProfileEditModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserProfileEditModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
