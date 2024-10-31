import { TestBed } from '@angular/core/testing';

import { AddPostModalService } from './add-post-modal.service';

describe('AddPostModalService', () => {
  let service: AddPostModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddPostModalService);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
