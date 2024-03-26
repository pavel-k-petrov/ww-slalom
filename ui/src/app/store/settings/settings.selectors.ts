import { Selector } from '@ngxs/store';

import { SettingsStateModel } from './settings-state-model';
import { SettingsState } from './settings.state';

export class SettingsSelectors {
  @Selector([SettingsState])
  static judgementItems(state: SettingsStateModel) {
    return (
      judgeCode: string
      // параметры
    ) => {
      // данные
      const result = state.judges[judgeCode];
      return result?.judgementItems ?? [];
    };
  }

  @Selector([SettingsState])
  static judgesList(state: SettingsStateModel) {
    const judgesList = Object.getOwnPropertyNames(state.judges).map((x) => ({
      code: x,
      title: state.judges[x].title,
    }));

    return judgesList;
  }

  @Selector([SettingsState])
  static attempts(state: SettingsStateModel) {
    return state.attempts;
  }

  @Selector([SettingsState])
  static gates(state: SettingsStateModel) {
    return state.gates;
  }

  @Selector([SettingsState])
  static groups(state: SettingsStateModel) {
    return state.groups;
  }
}
