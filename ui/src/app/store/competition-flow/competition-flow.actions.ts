export class SetCurrentAttempt {
  static readonly type = '[CompetitionFlow] SetCurrentAttempt';
  constructor(
    public attempt: {
      code: string;
      title: string;
    }
  ) {}
}
