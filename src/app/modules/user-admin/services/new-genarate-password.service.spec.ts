import { TestBed } from '@angular/core/testing';

import { NewGenaratePasswordService } from './new-genarate-password.service';

describe('NewGenaratePasswordService', () => {
  let service: NewGenaratePasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewGenaratePasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
