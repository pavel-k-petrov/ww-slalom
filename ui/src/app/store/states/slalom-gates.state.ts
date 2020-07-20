import { Injectable } from '@angular/core';
import { TimeService } from '@app/common/time.service';
import {Action, State, StateContext} from '@ngxs/store';

import { UpdateSlalomGatesAction } from '../actions/update-slalom-gates.action';
import { SlalomGatesStateModel } from '../models/slalom-gates-state-model';

@State<SlalomGatesStateModel>({
  name: 'SlalomGatesState',
  defaults: [],
})
@Injectable()
export class SlalomGatesState {

  constructor(private readonly timeService: TimeService) { }

  @Action(UpdateSlalomGatesAction)
  updateSlalomGates(ctx: StateContext<SlalomGatesStateModel>, action: UpdateSlalomGatesAction): void{
    // TODO update server state
    const stateModel = ctx.getState();

  }
}
