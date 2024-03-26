export class GoToJudgeByCode {
  static readonly type = '[Global] GoToJudgeByCode';
  constructor(public judgeCode: string) {}
}

export class GoToResults {
  static readonly type = '[Global] GoToResults';
  constructor() {}
}

export class GoToRegistration {
  static readonly type = '[Global] GoToRegistration';
  constructor() {}
}

