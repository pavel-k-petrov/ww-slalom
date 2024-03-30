import { Injectable } from '@angular/core';
import { Navigate } from '@ngxs/router-plugin';
import { Action, State, StateContext, Store } from '@ngxs/store';

import {
  GoToJudgeByCode,
  GoToManagement,
  GoToRegistration,
  GoToResults,
} from './navigation.actions';

@State<unknown>({
  name: 'navigation',
})
@Injectable()
export class NavigationState {
  constructor(private store: Store) {}

  @Action(GoToRegistration)
  goToRegistration(ctx: StateContext<unknown>) {
    ctx.dispatch(new Navigate(['participants'], undefined, {}));
  }

  @Action(GoToResults)
  goToResults(ctx: StateContext<unknown>) {
    ctx.dispatch(new Navigate(['results'], undefined, {}));
  }
  @Action(GoToManagement)
  goManagement(ctx: StateContext<unknown>) {
    ctx.dispatch(new Navigate(['management'], undefined, {}));
  }

  @Action(GoToJudgeByCode)
  goToJudgementAdjustment(ctx: StateContext<unknown>, action: GoToJudgeByCode) {
    ctx.dispatch(new Navigate(['judgement', action.judgeCode], undefined, {}));
  }
}
