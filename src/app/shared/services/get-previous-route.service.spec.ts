import { TestBed } from '@angular/core/testing';

import { GetPreviousRouteService } from './get-previous-route.service';

describe('GetPreviousRouteService', () => {
  let service: GetPreviousRouteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetPreviousRouteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
