import { Injectable } from '@angular/core';
import { AddAttemptResult as AddAttemptResultGlobal } from '@app/store/judgement/judgement.actions';
import { JudgementSelectors } from '@app/store/judgement/judgement.selectors';
import { Navigate } from '@ngxs/router-plugin';
import { Action, State, StateContext, Store } from '@ngxs/store';

import {
  GoToJudgement,
  GoToJudgementAdjustment,
  AddAttemptResult,
  GoToParticipantSelection,
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
      SlalomGateJudgementSelectors.judgementIdsFromRoute
    )?.judgeId;

    const dataSelector = this.store.selectSnapshot(
      JudgementSelectors.byNumberAndAttempt
    );
    let pageType = 'add';
    const judgeSettingsSelector = this.store.selectSnapshot(
      SlalomGateJudgementSelectors.judgeSettingsById
    );
    const judgeSettings = judgeSettingsSelector(judgeId);
    if (
      judgeSettings.judgementItems.find((x) => x === 'start' || x === 'finish')
    ) {
      pageType = 'edit';
    } else {
      const data = dataSelector(
        Number(action.participantNumber),
        action.attemptCode
      );
      if (data) {
        if (judgeSettings.judgementItems.find((x) => data.hasOwnProperty(x))) {
          pageType = 'edit';
        }
      }
    }

    ctx.dispatch(
      new Navigate(
        [
          'judgement',
          judgeId,
          action.attemptCode,
          action.participantNumber,
          pageType,
        ],
        undefined,
        {}
      )
    );
  }

  @Action(GoToJudgementAdjustment)
  goToJudgementAdjustment(ctx: StateContext<unknown>) {
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

  @Action(GoToParticipantSelection)
  goToParticipantSelection(ctx: StateContext<unknown>) {
    const ids = this.store.selectSnapshot(
      SlalomGateJudgementSelectors.judgementIdsFromRoute
    );

    ctx.dispatch(
      new Navigate(
        ['judgement', ids.judgeId, 'select-participant'],
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
