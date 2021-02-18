import { SlalomTime } from './models';

export type GateUpdate = {
  gateNumber: number;
  penalty: number;
  isTerminated?: boolean;
};

export type StartTimeUpdate = {
  startTime: SlalomTime;
};

export type FinishTimeUpdate = {
  finishTime: SlalomTime;
};

export type SlalomGatesUpdate = GateUpdate | StartTimeUpdate | FinishTimeUpdate;

export class UpdateSlalomGatesAction {
  static readonly type = '[Judge Page] Update Gates';
  constructor(
    public attemptId: number,
    public participantNumber: number,
    public updates: SlalomGatesUpdate[]
  ) {}
}
