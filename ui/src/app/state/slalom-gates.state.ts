import { Injectable } from '@angular/core';
import { TimeService } from '@app/common/time.service';
import { Action, State, StateContext } from '@ngxs/store';

import {
  SlalomGatesStateModel,
  SyncronizationStatus,
} from './models/slalom-gates-state-model';
import {
  FinishTimeUpdate,
  GateUpdate,
  SlalomGatesUpdate,
  StartTimeUpdate,
  UpdateSlalomGatesAction,
} from './update-slalom-gates.action';

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
    for (const update of action.updates) {
      const stateUpdate = {
        attemptId: action.attemptId,
        participantNumber: action.participantNumber,
        syncronizationStatus: 'local' as SyncronizationStatus,
      };
      if (this.isGateUpdate(update)) {
        stateModel.push({
          ...stateUpdate,
          gateNumber: update.gateNumber,
          penalty: update.penalty,
          isTerminated: update.isTerminated,
        });
      } else if (this.isStartTimeUpdate(update)) {
        stateModel.push({
          ...stateUpdate,
          startTime: update.startTime,
        });
      } else if (this.isFinishTimeUpdate(update)) {
        stateModel.push({
          ...stateUpdate,
          finishTime: update.finishTime,
        });
      }
      ctx.setState(stateModel);
    }
  }

  private isGateUpdate(update: SlalomGatesUpdate): update is GateUpdate {
    return (update as GateUpdate).gateNumber !== undefined;
  }

  private isStartTimeUpdate(
    update: SlalomGatesUpdate
  ): update is StartTimeUpdate {
    return (update as StartTimeUpdate).startTime !== undefined;
  }

  private isFinishTimeUpdate(
    update: SlalomGatesUpdate
  ): update is FinishTimeUpdate {
    return (update as FinishTimeUpdate).finishTime !== undefined;
  }
}
