import { TestBed } from '@angular/core/testing';

import { TimesheetUserService } from './timesheet-user.service';

describe('TimesheetUserService', () => {
  let service: TimesheetUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimesheetUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
