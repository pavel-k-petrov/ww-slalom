import { Selector } from '@ngxs/store';

import { CopmetitionFlowStateModel } from './competition-flow-state-model';
import { CopmetitionFlowState } from './competition-flow.state';

export class CompetitionFlowSelectors {
  @Selector([CopmetitionFlowState])
  static currentAttempt(state: CopmetitionFlowStateModel) {
    return state.currentAttempt;
  }
}
