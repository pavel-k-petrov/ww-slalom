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

export class ResultsSelectors {
  @Selector([JudgementState, ParticipantsSelectors.byNumber])
  static allResults(
    state: JudgementStateModel,
    participantSelector: (participantNumber: number) => Participant
  ): string {
    return JSON.stringify(state);
  }
}
