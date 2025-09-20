import { TestBed } from '@angular/core/testing';

import { SteamApi } from './steam-api';

describe('SteamApi', () => {
  let service: SteamApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SteamApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
