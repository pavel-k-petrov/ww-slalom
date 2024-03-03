import { GateResult, JudgementItemType, SlalomTime } from '../models';

export type SingleAttemptResults = {
  [item in JudgementItemType]?: item extends number ? GateResult : SlalomTime;
};

export interface JudgementStateModel {
  [participantNumber: number]: {
    [attemtCode: string]: SingleAttemptResults;
  };
}
