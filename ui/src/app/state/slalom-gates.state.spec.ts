import { TestBed } from '@angular/core/testing';
import { NgxsModule, Select, Store } from '@ngxs/store';
import { map } from 'rxjs/operators';

import { Observable } from 'rxjs';
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
    const gatePenalties$: Observable<{ penalty: number; isTerminated: boolean }[]> =
      store.select(SlalomGatesSelectors.gatePenalties).pipe(
        map(selectorFn => selectorFn(1, 1, [1, 2, 3]))
      );

      store.dispatch(new RecordJudgedGate(1, 1, 1, 0));
      store.dispatch(new RecordJudgedGate(1, 1, 2, 2));
      store.dispatch(new RecordJudgedGate(1, 1, 3, 0, true));
      store.dispatch(new RecordJudgedGate(1, 1, 1, 50));
    });

  it('should add startTime update', () => {
  });
});
