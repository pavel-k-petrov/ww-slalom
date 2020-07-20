import { SlalomTime } from '.';

export interface SlalomGatesStateModel {
  [index: number]: SlalomGatesStateGateItem | SlalomGatesStateStartTimeItem | SlalomGatesStateFinishTimeItem;
}

export interface SlalomGatesStateItemBase {
  attemptId: number;
  participantNumber: number;

  changeAuthor: string;
  changeTime: number;
}

export interface SlalomGatesStateGateItem extends SlalomGatesStateItemBase {
  /** Номер ворот */
  gateNumber: number;

  /** штраф */
  penalty?: number;

  /** Отстрел - преждевременное завершение попытки при взятии этих ворот */
  isTerminated?: boolean;
}

export interface SlalomGatesStateStartTimeItem extends SlalomGatesStateItemBase {
  startTime: SlalomTime;
}

export interface SlalomGatesStateFinishTimeItem extends SlalomGatesStateItemBase {
  finishTime: SlalomTime;
}

