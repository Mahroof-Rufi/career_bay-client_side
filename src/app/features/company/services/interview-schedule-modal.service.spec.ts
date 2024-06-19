import { TestBed } from '@angular/core/testing';

import { InterviewScheduleModalService } from './interview-schedule-modal.service';

describe('InterviewScheduleModalService', () => {
  let service: InterviewScheduleModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterviewScheduleModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
