import { Injectable } from '@angular/core';
import { AddAttemptResult as AddAttemptResultGlobal } from '@app/store/judgement/judgement.actions';
import { Navigate } from '@ngxs/router-plugin';
import { Action, State, StateContext, Store } from '@ngxs/store';

import {
  GoToJudgement,
  GoToJudgementAdjustment,
  AddAttemptResult,
} from './slalom-gates-judgement.actions';
import { SlalomGateJudgementSelectors } from './slalom-gates-judgement.selectors';

@State<unknown>({
  name: 'slalomGatesJudgement',
})
@Injectable()
export class SlalomGatesJudgementState {
  constructor(private store: Store) {}

  @Action(GoToJudgement)
  goToJudgements(ctx: StateContext<unknown>, action: GoToJudgement) {
    const judgeId = this.store.selectSnapshot(
      SlalomGateJudgementSelectors.judgeIdFromRoute
    );

    ctx.dispatch(
      new Navigate(
        ['judgement', judgeId, action.attemptCode, action.participantNumber],
        undefined,
        {}
      )
    );
  }

  @Action(GoToJudgementAdjustment)
  goToJudgementAdjustment(
    ctx: StateContext<unknown>,
    action: GoToJudgementAdjustment
  ) {
    const ids = this.store.selectSnapshot(
      SlalomGateJudgementSelectors.judgementIdsFromRoute
    );

    ctx.dispatch(
      new Navigate(
        [
          'judgement',
          ids.judgeId,
          ids.attemptCode,
          ids.participantNumber,
          'edit',
        ],
        undefined,
        {}
      )
    );
  }

  @Action(AddAttemptResult)
  addAttemptResult(ctx: StateContext<unknown>, action: AddAttemptResult) {
    const ids = this.store.selectSnapshot(
      SlalomGateJudgementSelectors.judgementIdsFromRoute
    );

    this.store.dispatch(
      new AddAttemptResultGlobal(
        Number(ids.participantNumber),
        ids.attemptCode,
        action.attemptData
      )
    );
  }
}
