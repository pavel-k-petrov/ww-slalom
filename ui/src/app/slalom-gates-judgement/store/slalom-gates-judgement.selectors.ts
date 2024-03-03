import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { JudgementSelectors } from '@app/store/judgement/judgement.selectors';
import { GateResult, JudgementItemType } from '@app/store/models';
import {
  Participant,
  ParticipantsStateModel,
} from '@app/store/participants/participants-state-model';
import { ParticipantsSelectors } from '@app/store/participants/participants.selectors';
import { ParticipantsState } from '@app/store/participants/participants.state';
import { SettingsStateModel } from '@app/store/settings/settings-state-model';
import { SettingsState } from '@app/store/settings/settings.state';
import { RouterState, RouterStateModel } from '@ngxs/router-plugin';
import { Selector } from '@ngxs/store';

import { ParticipantForJudgement } from './models';

export class SlalomGateJudgementSelectors {
  @Selector([
    ParticipantsState,
    SlalomGateJudgementSelectors.judgementIdsFromRoute,
  ])
  static currentParticipantFromRoute(
    state: ParticipantsStateModel,
    ids: {
      judgeId: string;
      attemptCode: string;
      participantNumber: string;
    }
  ) {
    const participantNumber = Number(ids?.participantNumber);
    const participant: Participant = !isNaN(participantNumber)
      ? state[participantNumber]
      : undefined;
    const judged: ParticipantForJudgement = participant
      ? {
          participantNumber: participantNumber + '',
          shortInfo: `${participantNumber} - ${participant.name} (${participant.group})`,
        }
      : {
          participantNumber: participantNumber + '',
          shortInfo: participantNumber + ' - незарегистрирован',
        };
    return judged;
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
  /**
   * получить параметры урла - код судьи, попытки, номер участника
   */
  @Selector([RouterState])
  static judgementIdsFromRoute(routerState: RouterStateModel): {
    judgeId: string;
    attemptCode: string;
    participantNumber: string;
  } {
    const routerSnapshot: RouterStateSnapshot = routerState.state;
    let node: ActivatedRouteSnapshot = routerSnapshot.root;
    const result = {
      judgeId: null,
      attemptCode: null,
      participantNumber: null,
    };
    while (node) {
      result.judgeId ??= node.params['judge-id'];
      result.attemptCode ??= node.params.attemptCode;
      result.participantNumber ??= node.params.id;
      node = node.firstChild;
    }

    return result;
  }

  @Selector([SettingsState, SlalomGateJudgementSelectors.judgementIdsFromRoute])
  static currentJudgeFromRoute(
    state: SettingsStateModel,
    ids: {
      judgeId: string;
      attemptCode: string;
      participantNumber: string;
    }
  ) {
    const judge = state.judges[ids.judgeId];
    return judge;
  }

  @Selector([SlalomGateJudgementSelectors.currentJudgementDataFromRoute])
  static currentJudgementDataJsonFromRoute(data: any) {
    return JSON.stringify(data);
  }

  @Selector([
    JudgementSelectors.byNumberAndAttempt,
    SlalomGateJudgementSelectors.judgementIdsFromRoute,
  ])
  static currentJudgementDataFromRoute(
    judgementDataSelector: (
      participantNumber: number,
      attemptCode: string
    ) => { [item in JudgementItemType]?: GateResult | string },
    ids: {
      judgeId: string;
      attemptCode: string;
      participantNumber: string;
    }
  ) {
    const attemtResult = judgementDataSelector(
      Number(ids?.participantNumber),
      ids.attemptCode
    );
    return attemtResult;
  }
}
