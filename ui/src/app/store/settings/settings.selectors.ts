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
      const result = [];
      return result;
    };
  }
  @Selector([SettingsState])
  static attempts(state: SettingsStateModel) {
    return state.attempts;
  }
}
