import { TestBed } from '@angular/core/testing';

import { UserChatService } from './user-chat.service';

describe('UserChatService', () => {
  let service: UserChatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserChatService);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
