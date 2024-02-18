export class GoToJudgement {
  static readonly type = '[Judgement Form] GoToJudgement';
  constructor(public participantNumber: string, public attemptCode: string) { }
}
export class GoToJudgementAdjustment {
  static readonly type = '[Judgement Form] GoToJudgementAdjustment';
  constructor() { }
}
