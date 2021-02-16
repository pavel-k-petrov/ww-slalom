import { Injectable } from '@angular/core';
import { TimeService } from '@app/common/time.service';
import { Action, State, StateContext } from '@ngxs/store';

import {
  SlalomGatesUpdate,
  UpdateSlalomGatesAction,
  GateUpdate,
  StartTimeUpdate,
  FinishTimeUpdate,
} from './update-slalom-gates.action';
import {
  SlalomGatesStateModel,
  SyncronizationStatus,
} from './models/slalom-gates-state-model';

@State<SlalomGatesStateModel>({
  name: 'SlalomGatesState',
  defaults: [],
})
@Injectable()
export class SlalomGatesState {
  constructor(private readonly timeService: TimeService) {}

  @Action(UpdateSlalomGatesAction)
  updateSlalomGates(
    ctx: StateContext<SlalomGatesStateModel>,
    action: UpdateSlalomGatesAction
  ): void {
    // TODO update server state
    const stateModel = ctx.getState();
    for (let update of action.updates) {
      let stateUpdate = {
        attemptId: action.attemptId,
        participantNumber: action.participantNumber,
        syncronizationStatus: 'local' as SyncronizationStatus,
      };
      if (this.IsGateUpdate(update)) {
        stateModel.push({
          ...stateUpdate,
          gateNumber: update.gateNumber,
          penalty: update.penalty,
          isTerminated: update.isTerminated,
        });
      } else if (this.IsStartTimeUpdate(update)) {
        stateModel.push({
          ...stateUpdate,
          startTime: update.startTime,
        });
      } else if (this.IsFinishTimeUpdate(update)) {
        stateModel.push({
          ...stateUpdate,
          finishTime: update.finishTime,
        });
      }
      ctx.setState(stateModel);
    }
  }

  private IsGateUpdate(update: SlalomGatesUpdate): update is GateUpdate {
    return (update as GateUpdate).gateNumber !== undefined;
  }

  private IsStartTimeUpdate(
    update: SlalomGatesUpdate
  ): update is StartTimeUpdate {
    return (update as StartTimeUpdate).startTime !== undefined;
  }

  private IsFinishTimeUpdate(
    update: SlalomGatesUpdate
  ): update is FinishTimeUpdate {
    return (update as FinishTimeUpdate).finishTime !== undefined;
  }
}
