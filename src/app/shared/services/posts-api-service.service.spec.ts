import { TestBed } from '@angular/core/testing';

import { PostsApiServiceService } from './posts-api-service.service';

describe('PostsApiServiceService', () => {
  let service: PostsApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostsApiServiceService);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
