import { Selector } from '@ngxs/store';

import { JudgementStateModel, SingleAttemptResults } from './judgement-state-model';
import { JudgementState } from './judgement.state';

export class JudgementSelectors {
  @Selector([JudgementState])
  static byNumberAndAttempt(state: JudgementStateModel) {
    return (
      participantNumber: number,
      attemptCode: string,
    ) => {
      const result: SingleAttemptResults = state[participantNumber]?.[attemptCode] ?? {};

      return result;
    };
  }
}
