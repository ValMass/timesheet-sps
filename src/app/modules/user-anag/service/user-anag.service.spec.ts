import { TestBed } from '@angular/core/testing';

import { UserAnagService } from './user-anag.service';

describe('UserAnagService', () => {
  let service: UserAnagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAnagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
