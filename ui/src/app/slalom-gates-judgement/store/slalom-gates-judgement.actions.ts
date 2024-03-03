import { SingleAttemptResults } from '@app/store/judgement/judgement-state-model';

export class GoToJudgement {
  static readonly type = '[Judgement Form] GoToJudgement';
  constructor(public participantNumber: string, public attemptCode: string) { }
}

export class GoToJudgementAdjustment {
  static readonly type = '[Judgement Form] GoToJudgementAdjustment';
  constructor() { }
}

export class AddAttemptResult {
  static readonly type = '[Judgement Form] AddAttemptResult';
  constructor(
    public attemptData: SingleAttemptResults
  ) { }
}
