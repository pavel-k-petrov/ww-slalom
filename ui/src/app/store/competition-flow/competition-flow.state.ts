import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';

import { CompetitionFlowStateModel } from './competition-flow-state-model';
import { SetCurrentAttempt } from './competition-flow.actions';

@State<CompetitionFlowStateModel>({
  name: 'CopmetitionFlowState',
  defaults: {
    currentAttempt: { code: 'attempt1', title: 'попытка №1' },
  },
})
@Injectable()
export class CopmetitionFlowState {

  @Action(SetCurrentAttempt)
  setCurrentAttempt(ctx: StateContext<CompetitionFlowStateModel>, action: SetCurrentAttempt){
    const newState: CompetitionFlowStateModel = {
      currentAttempt: action.attempt,
    };

    ctx.setState(newState);
  }
}
