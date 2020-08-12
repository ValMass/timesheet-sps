import { TestBed } from '@angular/core/testing';

import { CustomerOfficeService } from './customer-office.service';

describe('CustomerOfficeService', () => {
  let service: CustomerOfficeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerOfficeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
