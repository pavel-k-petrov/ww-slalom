export class UpdateSlalomGatesAction {
  static readonly type = '[Judge Page] Update Gates';
  constructor(
    public attemptId: number,
    public participantNumber: number,
    public updates: {
      gateNumber: number;
      penalty: number;
      isTerminated?: boolean;
    }[]) { }
}
