import { TestBed } from '@angular/core/testing';

import { StatsUserService } from './stats-user.service';

describe('StatsUserService', () => {
  let service: StatsUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatsUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
