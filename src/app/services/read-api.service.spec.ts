import { TestBed } from '@angular/core/testing';

import { ReadApiService } from './read-api.service';

describe('ReadApiService', () => {
  let service: ReadApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReadApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
