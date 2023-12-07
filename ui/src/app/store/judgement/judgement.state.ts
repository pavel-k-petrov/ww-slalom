import { Injectable } from '@angular/core';
import { State } from '@ngxs/store';

import { JudgementStateModel } from './judgement-state-model';

@State<JudgementStateModel>({
  name: 'JudgementState',
  defaults: [],
})
@Injectable()
export class JudgementState {
}
