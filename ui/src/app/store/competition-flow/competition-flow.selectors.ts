import { Selector } from '@ngxs/store';

import { CompetitionFlowStateModel } from './competition-flow-state-model';
import { CopmetitionFlowState } from './competition-flow.state';

export class CompetitionFlowSelectors {
  @Selector([CopmetitionFlowState])
  static currentAttempt(state: CompetitionFlowStateModel) {
    return state.currentAttempt;
  }
}
