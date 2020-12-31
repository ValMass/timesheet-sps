import { TestBed } from '@angular/core/testing';

import { TimesheetaddeventService } from './timesheetaddevent.service';

describe('TimesheetaddeventService', () => {
  let service: TimesheetaddeventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimesheetaddeventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
