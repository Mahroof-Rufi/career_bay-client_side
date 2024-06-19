import { TestBed } from '@angular/core/testing';

import { LiveMeetService } from './live-meet.service';

describe('LiveMeetService', () => {
  let service: LiveMeetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiveMeetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
