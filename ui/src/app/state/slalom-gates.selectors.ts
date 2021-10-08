import { createSelector, Selector } from '@ngxs/store';

import { SlalomGatesStateModel } from './models/slalom-gates-state-model';
import { SlalomGatesState } from './slalom-gates.state';

export class SlalomGatesSelectors {
  // @Selector([SlalomGatesState])
  static gatePenalties(
    participantNumber: number,
    attemptId: number,
    gateNumbers: number[]
  ) {
    return createSelector(
      [SlalomGatesState],
      (state: SlalomGatesStateModel) => {
        const participantData = state[participantNumber];
        const attemptData = participantData.find(
          (attempt) => attempt.attemptId == attemptId
        );
        const penaltyItems = attemptData.gatePenalties.filter((p) =>
          gateNumbers.find(p)
        );
        return penaltyItems.map((x) => x.penalty);
      }
    );
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
