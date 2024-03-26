import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';

import { ParticipantsStateModel } from './participants-state-model';
import { AddOrUpdateParticipant } from './participants.actions';

@State<ParticipantsStateModel>({
  name: 'ParticipantsState',
  defaults: {
    51: {
      name: 'Соколов Владимир',
      group: 'K1',
    },
    25: {
      name: 'Анохина/Блохина',
      group: 'Б2см',
    },
    52: {
      name: 'Летов Егор',
      group: 'K1',
    },
    53: {
      name: 'Руссо Жан Жак',
      group: 'K1',
    },
    58: {
      name: 'Алёхин Александр',
      group: 'K1',
    },
  },
})
@Injectable()
export class ParticipantsState {
  @Action(AddOrUpdateParticipant)
  addOrUpdateParticipant(
    ctx: StateContext<ParticipantsStateModel>,
    action: AddOrUpdateParticipant
  ) {
    const newState = {
      ...ctx.getState(),
    };

    newState[action.participantNumber] = action.participantData;
    ctx.setState(newState);
  }
}
