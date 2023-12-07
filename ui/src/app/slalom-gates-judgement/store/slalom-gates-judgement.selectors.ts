import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ParticipantsStateModel } from '@app/store/participants/participants-state-model';
import { ParticipantsSelectors } from '@app/store/participants/participants.selectors';
import { ParticipantsState } from '@app/store/participants/participants.state';
import { RouterState, RouterStateModel } from '@ngxs/router-plugin';
import { Selector } from '@ngxs/store';

import { ParticipantForJudgement } from './models';

export class SlalomGateJudgementSelectors {
  @Selector([ParticipantsState])
  static byNumber(state: ParticipantsStateModel) {
    return (participantNumber: number) => state[participantNumber];
  }

  @Selector([ParticipantsSelectors.recomendedForJudge])
  static recomendedForJudge(
    selector: (judgeId: string) => ParticipantsStateModel
  ): (judgeId: string) => ParticipantForJudgement[] {
    // return (judgeName: string) => selector(judgeName);
    return (judgeId: string) => [
      {
        attemptCode: 'attempt1',
        participantNumber: '51',
        shortInfo: '51 - Владимир Соколов (K1) попытка 1',
      },
      {
        attemptCode: 'attempt1',
        participantNumber: '53',
        shortInfo: '53 - Жан Жак Руссо (K1) попытка 1',
      },
      {
        attemptCode: 'attempt1',
        participantNumber: '58',
        shortInfo: '58 - Алёхин Александр (K1) попытка 1',
      },
    ];
  }

  @Selector([RouterState])
  static judgeIdFromRoute(routerState: RouterStateModel): string {
    const routerSnapshot: RouterStateSnapshot = routerState.state;
    let node: ActivatedRouteSnapshot = routerSnapshot.root;
    while (node.firstChild) {
      const judgeId = node.params['judge-id'];
      if (judgeId) {
        return judgeId;
      }
      node = node.firstChild;
    }
  }
}
