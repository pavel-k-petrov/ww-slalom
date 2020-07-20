import { TestBed } from '@angular/core/testing';

import { SlalomGatesState } from '.';

describe('SlalomGatesState', () => {
  let service: SlalomGatesState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SlalomGatesState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
