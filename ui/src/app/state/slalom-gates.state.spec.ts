import { NgxsModule, Store } from '@ngxs/store';
import { TestBed } from '@angular/core/testing';

import { SlalomGatesState, UpdateSlalomGatesAction } from '.';
import { SlalomGatesStateGateItem, SlalomGatesStateModel, SlalomGatesStateStartTimeItem } from './models/slalom-gates-state-model';

describe('SlalomGatesState', () => {
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([SlalomGatesState])]
    });
    store = TestBed.inject(Store);
  });


  it('should exist', () => {
      let state = store.selectSnapshot(state => state.SlalomGatesState) as SlalomGatesStateModel;
      expect(state).toBeTruthy();
  });

  it('should add gate update', () => {
    store.dispatch(new UpdateSlalomGatesAction(1, 12,
      [
        {
          gateNumber: 4,
          penalty: 2,
        }
      ]));

      let state = store.selectSnapshot(state => state.SlalomGatesState) as SlalomGatesStateModel;
      expect(state[0]).toEqual({
        attemptId: 1,
        participantNumber: 12,
        gateNumber: 4,
        penalty: 2,
        syncronizationStatus: 'local',
        isTerminated: undefined,
      } as SlalomGatesStateGateItem);
  });

  it('should add startTime update', () => {
    store.dispatch(new UpdateSlalomGatesAction(1, 12,
      [
        {
          startTime: {
            hour: 0,
            minute: 10,
          },
        }
      ]));

      let state = store.selectSnapshot(state => state.SlalomGatesState) as SlalomGatesStateModel;
      expect(state[0]).toEqual({
        attemptId: 1,
        participantNumber: 12,
        syncronizationStatus: 'local',
        startTime: {
          hour: 0,
          minute: 10,
        },
      } as SlalomGatesStateStartTimeItem);
  });
});
