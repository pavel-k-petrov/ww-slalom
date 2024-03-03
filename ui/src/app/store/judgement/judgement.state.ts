import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';

import { JudgementStateModel, SingleAttemptResults } from './judgement-state-model';
import { AddAttemptResult } from './judgement.actions';

@State<JudgementStateModel>({
  name: 'JudgementState',
  defaults: {},
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
