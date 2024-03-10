import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';

import { JudgementStateModel, SingleAttemptResults } from './judgement-state-model';
import { AddAttemptResult } from './judgement.actions';

@State<JudgementStateModel>({
  name: 'JudgementState',
  defaults: {
    55: {
      attempt1: {
        start: '11:00:30',
      }
    },
    53: {
      attempt1: {
        start: '11:00:30',
        1: 2,
        2: 0,
      }
    },
    52: {
      attempt1: {
        start: '11:00:30',
        1: 0,
        2: 2,
        3: 0,
        4: 2,
      }
    },
  },
})
@Injectable()
export class JudgementState {
  @Action(AddAttemptResult)
  addAttemptResult(
    ctx: StateContext<JudgementStateModel>,
    action: AddAttemptResult,
  ) {
    const newState = {
      ...ctx.getState(),
    };
    const participantData = {
      ...newState[action.participantNumber],
    };
    const attemptData: SingleAttemptResults = {
      ...participantData[action.attemptCode],
      ...action.attemptResults
    };
    participantData[action.attemptCode] = attemptData;
    newState[action.participantNumber] = participantData;
    ctx.setState(newState);
  }
}
