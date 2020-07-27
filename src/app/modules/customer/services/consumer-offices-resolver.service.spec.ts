import { TestBed } from '@angular/core/testing';

import { ConsumerOfficesResolverService } from './consumer-offices-resolver.service';

describe('ConsumerOfficesResolverService', () => {
  let service: ConsumerOfficesResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsumerOfficesResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
