import { TestBed } from '@angular/core/testing';

import { TimesheethttpService } from './timesheethttp.service';

describe('TimesheethttpService', () => {
  let service: TimesheethttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimesheethttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
