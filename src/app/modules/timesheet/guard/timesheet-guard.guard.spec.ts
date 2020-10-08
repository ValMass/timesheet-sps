import { TestBed } from '@angular/core/testing';

import { TimesheetGuardGuard } from './timesheet-guard.guard';

describe('TimesheetGuardGuard', () => {
  let guard: TimesheetGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TimesheetGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
