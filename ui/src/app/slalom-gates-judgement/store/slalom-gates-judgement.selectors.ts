import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CompetitionFlowSelectors } from '@app/store/competition-flow/competition-flow.selectors';
import { JudgementStateModel } from '@app/store/judgement/judgement-state-model';
import { JudgementSelectors } from '@app/store/judgement/judgement.selectors';
import { JudgementState } from '@app/store/judgement/judgement.state';
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
  private static mapParticipantToJudgedParticipant(
    participantNumber: number,
    participant: Participant
  ) {
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
    const judged: ParticipantForJudgement =
      this.mapParticipantToJudgedParticipant(participantNumber, participant);
    return judged;
  }

  @Selector([ParticipantsSelectors.byNumber])
  static participantByNumber(
    selector: (participantNumber: number) => Participant
  ) {
    return (participantNumber: number) =>
      this.mapParticipantToJudgedParticipant(
        participantNumber,
        selector(participantNumber)
      );
  }

  @Selector([
    SlalomGateJudgementSelectors.currentJudgeFromRoute,
    CompetitionFlowSelectors.currentAttempt,
    JudgementState,
    SlalomGateJudgementSelectors.participantByNumber
  ])
  static recomendedForJudge(
    judge: {
      judgementItems: JudgementItemType[];
    },
    attempt: { code: string; title: string },
    state: JudgementStateModel,
    participantSelector: (participantNumber: number) => ParticipantForJudgement,
  ): ParticipantForJudgement[] {
    const recomended = Object.getOwnPropertyNames(state).reduce(
      (
        previousValue: [],
        currentValue: string /*, idx: number, arr: string[]*/
      ) => {
        const allData = state[Number(currentValue)];
        const data = allData ? allData[attempt.code] : undefined;
        if (
          !data ||
          Object.getOwnPropertyNames(data).length === 0 ||
          judge?.judgementItems.every((x) => data.hasOwnProperty(x))
        ) {
          return previousValue;
        }
        const participant = participantSelector(Number(currentValue));
        participant.attemptCode = attempt.code;
        return [...previousValue, participant];
      },
      []
    );
    return recomended;
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
  static judgeSettingsById(state: SettingsStateModel) {
    return (judgeId) => state.judges[judgeId];
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
