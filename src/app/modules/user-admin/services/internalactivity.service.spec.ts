import { TestBed } from '@angular/core/testing';

import { InternalactivityService } from './internalactivity.service';

describe('InternalactivityService', () => {
  let service: InternalactivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InternalactivityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
