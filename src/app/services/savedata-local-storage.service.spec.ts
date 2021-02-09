import { TestBed } from '@angular/core/testing';

import { SavedataLocalStorageService } from './savedata-local-storage.service';

describe('SavedataLocalStorageService', () => {
  let service: SavedataLocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SavedataLocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
