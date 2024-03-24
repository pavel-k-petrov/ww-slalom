import { Injectable } from '@angular/core';
import { Action, State, StateContext, Store } from '@ngxs/store';

import { ResultsStateModel } from './results-state-model';
import { SetGroupForResultsTable } from './results.actions';

@State<ResultsStateModel>({
  name: 'results',
  defaults: {
    selectedGroup: null,
  },
})
@Injectable()
export class ResultsState {
  constructor(private store: Store) {}

  @Action(SetGroupForResultsTable)
  addAttemptResult(
    ctx: StateContext<ResultsStateModel>,
    action: SetGroupForResultsTable
  ) {
    ctx.setState({
      selectedGroup: action.groupCode,
    });
  }
}
