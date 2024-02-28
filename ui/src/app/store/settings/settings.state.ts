import { Injectable } from '@angular/core';
import { State } from '@ngxs/store';

import { SettingsStateModel } from './settings-state-model';

@State<SettingsStateModel>({
  name: 'SettingsState',
  defaults: {
    judges: {
      'judge-1': { judgementItems: ['Start'] },
      'judge-2': { judgementItems: [1, 2, 3, 4] },
      'judge-3': { judgementItems: ['Finish'] },
      'judge-master': { judgementItems: ['Start', 1, 2, 3, 4, 'Finish'] },
      'sample-judge': { judgementItems: [1, 2, 3, 4, 17] },
    },
    attempts: [
      { code: 'attempt1', title: 'попытка №1' },
      { code: 'attempt2', title: 'попытка №2' },
    ],
  },
})
@Injectable()
export class SettingsState {}
