import { SlalomTime } from '../models';

export type GateResult = 0 | 2 | 50 | 'DNF';


// TODO обдумать как лучше - номер попытки и номер участника не передаются и берутся из состояния или явно передаются
/** установить результаты по одним воротам */
export class SetGateResult {
  static readonly type = '[Judgement Form] SetGateResult';
  constructor(public gateNumber: number, public gateResult: GateResult) { }
}

export class SetStartTime {
  static readonly type = '[Judgement Form] SetStartTime';
  constructor(public time: SlalomTime) { }
}

export class SetFinishTime {
  static readonly type = '[Judgement Form] SetStartTime';
  constructor(public time: SlalomTime) { }
}

