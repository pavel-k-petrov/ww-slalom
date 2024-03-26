import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';

import {
  JudgementStateModel,
  SingleAttemptResults,
} from './judgement-state-model';
import { AddAttemptResult } from './judgement.actions';

@State<JudgementStateModel>({
  name: 'JudgementState',
  defaults: {
    51: {
      attempt1: {
        start: '11:00:00',
        1: 2,
        2: 0,
        //3: 0,
        4: 0,
        finish: '11:02:12',
      },
      attempt2: {
        start: '12:30:10',
        1: 2,
        2: 0,
        3: 2,
        4: 0,
        finish: '12:32:16',
      },
    },
    52: {
      attempt1: {
        start: '11:01:00',
        1: 0,
        2: 2,
        3: 0,
        4: 2,
        finish: '11:03:04',
      },
      attempt2: {
        start: '12:31:00',
        1: 2,
        2: 0,
        3: 'DNF',
      },
    },
    53: {
      attempt1: {
        start: '11:01:30',
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        finish: '11:03:44',
      },
      attempt2: {
        start: '12:32:00',
        1: 0,
        2: 0,
        3: 50,
        4: 0,
        finish: '12:34:30',
      },
    },
    54: {
      attempt1: {
        start: '11:02:00',
        1: 0,
        2: 0,
        3: 2,
        4: 0,
        finish: '11:04:12',
      },
      attempt2: {
        start: '12:33:00',
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        finish: '12:35:30',
      },
    },
    25: {
      attempt1: {
        start: '11:03:00',
        1: 2,
        2: 2,
        3: 0,
        4: 2,
        finish: '11:06:01',
      },
      attempt2: {
        start: '12:34:00',
        1: 0,
        2: 0,
        3: 2,
        4: 0,
        finish: '12:36:54',
      },
    },
  },
})
@Injectable()
export class JudgementState {
  @Action(AddAttemptResult)
  addAttemptResult(
    ctx: StateContext<JudgementStateModel>,
    action: AddAttemptResult
  ) {
    const newState = {
      ...ctx.getState(),
    };
    const participantData = {
      ...newState[action.participantNumber],
    };
    const attemptData: SingleAttemptResults = {
      ...participantData[action.attemptCode],
      ...action.attemptResults,
    };
    participantData[action.attemptCode] = attemptData;
    newState[action.participantNumber] = participantData;
    ctx.setState(newState);
  }
}
