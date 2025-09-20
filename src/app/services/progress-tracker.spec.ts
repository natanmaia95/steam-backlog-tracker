import { TestBed } from '@angular/core/testing';

import { ProgressTracker } from './progress-tracker';

describe('ProgressTracker', () => {
  let service: ProgressTracker;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgressTracker);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
