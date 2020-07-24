import { TestBed } from '@angular/core/testing';

import { CustomerListResolverService } from './customer-list-resolver.service';

describe('CustomerListResolverService', () => {
  let service: CustomerListResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerListResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
