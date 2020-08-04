import { TestBed } from '@angular/core/testing';

import { TimesheetResolverService } from './timesheet-resolver.service';

describe('TimesheetResolverService', () => {
  let service: TimesheetResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimesheetResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
