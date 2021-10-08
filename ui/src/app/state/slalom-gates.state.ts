import { Injectable } from '@angular/core';
import { TimeService } from '@app/common/time.service';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import {
  GatePenaltyItem,
  SlalomAttemptModel,
  SlalomGatesStateModel,
  SyncronizationStatus,
} from './models/slalom-gates-state-model';
import { RecordJudgedGate } from './slalom-gates.actions';

@State<SlalomGatesStateModel>({
  name: 'SlalomGatesState',
  defaults: [],
})
@Injectable()
export class SlalomGatesState {
  constructor(private readonly timeService: TimeService) {}

  @Action(RecordJudgedGate)
  updateSlalomGates(
    ctx: StateContext<SlalomGatesStateModel>,
    action: RecordJudgedGate
  ): void {
    // TODO update server state
    const stateModel: SlalomGatesStateModel = ctx.getState();
    const participantData: SlalomAttemptModel =
      stateModel[action.participantNumber] ||
      ({
        attemptId: action.attemptId,
      } as SlalomAttemptModel);
    const gatePenalties: GatePenaltyItem[] =
      participantData.gatePenalties || [];

    const newGatePenaltyItem: GatePenaltyItem = {
      gateNumber: action.gateNumber,
      penalty: action.penalty,
      isTerminated: action.isTerminated,
      syncronizationStatus: 'local' as SyncronizationStatus,
    };

    gatePenalties[action.gateNumber] = newGatePenaltyItem;

    participantData.gatePenalties = gatePenalties;
    stateModel[action.participantNumber] = participantData;

    ctx.setState(stateModel);
  }
}
