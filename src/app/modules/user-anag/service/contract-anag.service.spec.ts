import { TestBed } from '@angular/core/testing';

import { ContractAnagService } from './contract-anag.service';

describe('ContractAnagService', () => {
  let service: ContractAnagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContractAnagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
