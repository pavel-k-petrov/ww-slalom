import { Injectable } from '@angular/core';
import { State } from '@ngxs/store';

import { SettingsStateModel } from './settings-state-model';

@State<SettingsStateModel>({
  name: 'SettingsState',
  defaults: {
    judges: {
      'judge-1': { judgementItems: ['start'] },
      'judge-2': { judgementItems: [1, 2, 3, 4] },
      'judge-3': { judgementItems: ['finish'] },
      'judge-master': { judgementItems: ['start', 1, 2, 3, 4, 'finish'] },
      'sample-judge': { judgementItems: ['start', 1, 17] },
    },
    attempts: [
      { code: 'attempt1', title: 'попытка №1' },
      { code: 'attempt2', title: 'попытка №2' },
    ],
  },
})
@Injectable()
export class SettingsState {}
