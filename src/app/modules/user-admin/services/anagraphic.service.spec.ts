import { TestBed } from '@angular/core/testing';

import { AnagraphicService } from './anagraphic.service';

describe('AnagraphicService', () => {
  let service: AnagraphicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnagraphicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
