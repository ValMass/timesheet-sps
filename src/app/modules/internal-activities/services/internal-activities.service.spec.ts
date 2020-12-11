import { TestBed } from '@angular/core/testing';

import { InternalActivitiesService } from './internal-activities.service';

describe('InternalActivitiesService', () => {
  let service: InternalActivitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InternalActivitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
