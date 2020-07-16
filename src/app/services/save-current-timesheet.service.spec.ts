import { TestBed } from '@angular/core/testing';

import { SaveCurrentTimesheetService } from './save-current-timesheet.service';

describe('SaveCurrentTimesheetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SaveCurrentTimesheetService = TestBed.get(SaveCurrentTimesheetService);
    expect(service).toBeTruthy();
  });
});
