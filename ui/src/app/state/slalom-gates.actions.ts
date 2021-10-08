import { SlalomTime } from './models';

export class RecordJudgedGate {
  static readonly type = '[Judge Page] Record Penalty For Gate';
  constructor(
    /** номер попытки */
    public attemptId: number,
    /** номер участника */
    public participantNumber: number,
    /** номер ворот */
    public gateNumber: number,
    /** штраф */
    public penalty: number,
    /** произошёл оверкиль */
    public isTerminated?: boolean
  ) {}
}
