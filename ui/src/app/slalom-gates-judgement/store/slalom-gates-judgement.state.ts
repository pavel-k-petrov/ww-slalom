import { Injectable } from '@angular/core';
import { Navigate } from '@ngxs/router-plugin';
import { Action, State, StateContext, Store } from '@ngxs/store';

import { GoToJudgement } from './slalom-gates-judgement.actions';
import { SlalomGateJudgementSelectors } from './slalom-gates-judgement.selectors';

@State<unknown>({
  name: 'slalomGatesJudgement',
})
@Injectable()
export class SlalomGatesJudgementState {
  constructor(private store: Store) {}

  @Action(GoToJudgement)
  goToJudgements(ctx: StateContext<unknown>, action: GoToJudgement) {
    const judgeId = this.store.selectSnapshot(SlalomGateJudgementSelectors.judgeIdFromRoute);

    ctx.dispatch(new Navigate(['judgement', judgeId, action.attemptCode, action.participantNumber], undefined, { }));
  }
}
