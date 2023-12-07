import { Selector } from '@ngxs/store';

import { ParticipantsStateModel } from './participants-state-model';
import { ParticipantsState } from './participants.state';

export class ParticipantsSelectors {
  @Selector([ParticipantsState])
  static byNumber(state: ParticipantsStateModel) {
    return (participantNumber: number) => state[participantNumber];
  }

  @Selector([ParticipantsState])
  static recomendedForJudge(state: ParticipantsStateModel) {
    return (judgeId: string) => state;
  }
}
