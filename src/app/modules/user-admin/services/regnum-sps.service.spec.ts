import { TestBed } from '@angular/core/testing';

import { RegnumSpsService } from './regnum-sps.service';

describe('RegnumSpsService', () => {
  let service: RegnumSpsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegnumSpsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
