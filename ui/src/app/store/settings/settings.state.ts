import { Injectable } from '@angular/core';
import { State } from '@ngxs/store';

import { SettingsStateModel } from './settings-state-model';

@State<SettingsStateModel>({
  name: 'SettingsState',
  defaults: {
    judges: {
      'judge-1': { title: 'Судья старта', judgementItems: ['start'] },
      'judge-2': { title: 'Ворота 1 - 4', judgementItems: [1, 2, 3, 4] },
      'judge-3': { title: 'Судья финиша', judgementItems: ['finish'] },
      'judge-master': {
        title: 'Все данные судейства',
        judgementItems: ['start', 1, 2, 3, 4, 'finish'],
      },
      'sample-judge': {
        title: 'Тестовый судья',
        judgementItems: ['start', 1, 17],
      },
    },
    attempts: [
      { code: 'attempt1', title: 'попытка №1' },
      { code: 'attempt2', title: 'попытка №2' },
    ],
    gates: [1, 2, 3, 4],
    groups: ['К1м', 'К1ж', 'Б2см', 'C1'],
  },
})
@Injectable()
export class SettingsState {}
