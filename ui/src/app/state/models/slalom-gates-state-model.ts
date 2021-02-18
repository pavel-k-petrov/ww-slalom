import { SlalomTime } from '.';

export interface SlalomGatesStateModel
{
  [index: number]:
    | SlalomGatesStateGateItem
    | SlalomGatesStateStartTimeItem
    | SlalomGatesStateFinishTimeItem;

  push(item: SlalomGatesStateGateItem
        | SlalomGatesStateStartTimeItem
        | SlalomGatesStateFinishTimeItem): void;
}

export interface SlalomGatesStateItemBase {
  attemptId: number;
  participantNumber: number;

  // TODO реализовать получение текущего пользователя при заполнении
  // TODO должно загружаться только для "ответственных" пользователей
  changeAuthor?: string;
  // TODO реализовать сервис времени
  changeTime?: number;
}

/** статус записи - локальное, в процессе отправки, общее */
export type SyncronizationStatus = 'local' | 'pending' | 'shared';

export interface SlalomGatesStateGateItem extends SlalomGatesStateItemBase {
  /** Номер ворот */
  gateNumber: number;

  /** штраф */
  penalty?: number;

  /** Отстрел - преждевременное завершение попытки при взятии этих ворот */
  isTerminated?: boolean;

  syncronizationStatus: SyncronizationStatus;
}

export interface SlalomGatesStateStartTimeItem
  extends SlalomGatesStateItemBase {
  startTime: SlalomTime;
}

export interface SlalomGatesStateFinishTimeItem
  extends SlalomGatesStateItemBase {
  finishTime: SlalomTime;
}
