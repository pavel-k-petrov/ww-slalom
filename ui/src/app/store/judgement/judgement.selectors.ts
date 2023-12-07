import { Selector } from '@ngxs/store';

import { JudgementStateModel } from './judgement-state-model';
import { JudgementState } from './judgement.state';

export class JudgementSelectors {
  @Selector([JudgementState])
  static byNumber(state: JudgementStateModel) {
    return (
      participantNumber: number
      // параметры
    ) => {
      // данные
      const result = [];
      return result;
    };
  }
}
