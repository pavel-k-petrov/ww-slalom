import { createSelector, Selector } from '@ngxs/store';

import { SlalomGatesStateModel } from './models/slalom-gates-state-model';
import { SlalomGatesState } from './slalom-gates.state';

export class SlalomGatesSelectors {
  @Selector([SlalomGatesState])
  static gatePenalties(state: SlalomGatesStateModel) {
    return (
      participantNumber: number,
      attemptId: number,
      gateNumbers: number[]
    ) => {
      const participantData = state[participantNumber];
      const attemptData = participantData?.find(
        (attempt) => attempt.attemptId === attemptId
      );
      const result = gateNumbers.map(gateNumber => {
        const gateResult = attemptData?.gatePenalties?.find(x => x.gateNumber === gateNumber);
        if (gateResult) {
          return {
            penalty: gateResult.penalty,
            isTerminated: gateResult.isTerminated,
          };
        }
        return undefined;
      });
      return result;
    };
  }


  @Selector([SlalomGatesState])
  static allAttemptDataByParticipant(
    state: SlalomGatesStateModel,
    participantNumber: number,
    attemptId: number
  ) {
    // state.
  }

  @Selector([SlalomGatesState])
  static startTime(
    state: SlalomGatesStateModel,
    participantNumber: number,
    attemptId: number
  ) {
    // state.
  }

  @Selector([SlalomGatesState])
  static finishTime(
    state: SlalomGatesStateModel,
    participantNumber: number,
    attemptId: number
  ) {
    // state.
  }
}
