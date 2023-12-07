import { Injectable } from '@angular/core';
import { State } from '@ngxs/store';

import { CopmetitionFlowStateModel } from './competition-flow-state-model';

@State<CopmetitionFlowStateModel>({
  name: 'CopmetitionFlowState',
  defaults: {
    currentAttempt: { code: 'attempt1', title: 'попытка №1' },
  },
})
@Injectable()
export class CopmetitionFlowState {}
