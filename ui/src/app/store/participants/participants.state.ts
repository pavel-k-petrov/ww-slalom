import { Injectable } from '@angular/core';
import { State } from '@ngxs/store';

import { ParticipantsStateModel } from './participants-state-model';

@State<ParticipantsStateModel>({
  name: 'ParticipantsState',
  defaults: {
    51: {
      name: 'Владимир Соколов',
      group: 'K1',
    },
    25: {
      name: 'Анохина/Блохина',
      group: 'Б2см',
    },
    52: {
      name: 'Егор Летов',
      group: 'K1',
    },
    53: {
      name: 'Жан Жак Руссо',
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
}
