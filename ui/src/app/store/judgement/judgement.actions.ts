import { GateResult, SlalomTime } from '../models';

import { SingleAttemptResults } from './judgement-state-model';

/** установить результаты по несколькмим элементам (не обязательно все) одной попытки */
export class AddAttemptResult {
  static readonly type = '[Global] AddAttemptResult';
  constructor(
    public participantNumber: number,
    public attemptCode: string,
    public attemptResults: SingleAttemptResults,
  ) {}
}

export class SetStartTime {
  static readonly type = '[Global] SetStartTime';
  constructor(public time: SlalomTime) {}
}

export class SetFinishTime {
  static readonly type = '[Global] SetStartTime';
  constructor(public time: SlalomTime) {}
}
