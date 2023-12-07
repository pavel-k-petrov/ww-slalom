import { SlalomTime } from '.';

// TODO подобрать адекватный тип модели состояния
export interface SlalomGatesStateModel {
  [participantNumber: number]: SlalomAttemptModel[];
}

/** данные по одной попытке одного участника */
export interface SlalomAttemptModel {
  attemptId: number;
  start?: StartTimeItem;
  finish?: FinishTimeItem;
  gatePenalties: GatePenaltyItem[];
}

export interface SlalomGatesStateItemBase {
  // TODO реализовать получение текущего пользователя при заполнении
  // TODO должно загружаться только для "ответственных" пользователей
  changeAuthor?: string;
  // TODO реализовать сервис времени
  changeTime?: number;

  /** статус записи - локальное, в процессе отправки, общее */
  syncronizationStatus: SyncronizationStatus;
}

/** статус записи - локальное, в процессе отправки, общее */
export type SyncronizationStatus = 'local' | 'pending' | 'shared';

export interface GatePenaltyItem extends SlalomGatesStateItemBase {
  /** Номер ворот */
  gateNumber: number;

  /** штраф */
  penalty?: number;

  /** Отстрел - преждевременное завершение попытки при взятии этих ворот */
  isTerminated?: boolean;
}

export interface StartTimeItem
  extends SlalomGatesStateItemBase {
  startTime: SlalomTime;
}

export interface FinishTimeItem
  extends SlalomGatesStateItemBase {
  finishTime: SlalomTime;
}
