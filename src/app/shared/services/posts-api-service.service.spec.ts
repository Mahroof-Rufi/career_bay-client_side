import { TestBed } from '@angular/core/testing';

import { PostsApiServiceService } from './posts-api-service.service';

describe('PostsApiServiceService', () => {
  let service: PostsApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostsApiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
