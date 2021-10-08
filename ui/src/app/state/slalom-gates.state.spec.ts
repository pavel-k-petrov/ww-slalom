import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';

import { SlalomGatesStateModel } from './models/slalom-gates-state-model';
import { SlalomGatesState, RecordJudgedGate, SlalomGatesSelectors } from '.';

describe('SlalomGatesState', () => {
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([SlalomGatesState])]
    });
    store = TestBed.inject(Store);
  });


  it('should exist', () => {
      const slalomGatesState = store.selectSnapshot(state => state.SlalomGatesState) as SlalomGatesStateModel;
      expect(slalomGatesState).toBeTruthy();
  });

  it('should add gate update', () => {
    store.select(SlalomGatesSelectors.gatePenalties)
  });

  it('should add startTime update', () => {
  });
});
