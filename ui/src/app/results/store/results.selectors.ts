import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CompetitionFlowSelectors } from '@app/store/competition-flow/competition-flow.selectors';
import {
  JudgementStateModel,
  SingleAttemptResults,
} from '@app/store/judgement/judgement-state-model';
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
import { SettingsSelectors } from '@app/store/settings/settings.selectors';
import { SettingsState } from '@app/store/settings/settings.state';
import { RouterState, RouterStateModel } from '@ngxs/router-plugin';
import { Selector } from '@ngxs/store';

export class ResultsSelectors {
  private static timeRegex = /(?<h>\d?\d):(?<m>\d?\d):(?<s>\d?\d)/;
  private static toSeconds(timeValue: string): number {
    const match = this.timeRegex.exec(timeValue);
    const hour = Number(match[1]);
    const min = Number(match[2]);
    const sec = Number(match[3]);
    return hour * 60 * 60 + min * 60 + sec;
  }

  private static secondsToString(totalSec: number): string {
    const pad: (x: number) => string = (x) => {
      if (x < 10) {
        return '0' + x;
      }
      return '' + x;
    };
    const hour = Math.trunc(totalSec / (60 * 60));
    const min = Math.trunc(totalSec / 60) % 60;
    const sec = totalSec % 60;
    return `${pad(hour)}:${pad(min)}:${pad(sec)}`;
  }

  private static calculateSingleAttempt(
    attemptData: SingleAttemptResults,
    gates: number[]
  ): CalculatedAttemptResults {
    let isDnf = false;
    let hasFullData = true;
    let penalty = 0;
    let scores: Partial<CalculatedAttemptResults> = {
      total: 24 * 60 * 60,
    };

    for (const gateNumber of gates) {
      if (attemptData[gateNumber] === 'DNF') {
        isDnf = true;
        hasFullData = true;
        break;
      }

      if (attemptData[gateNumber] || attemptData[gateNumber] === 0) {
        penalty += Number(attemptData[gateNumber]);
      } else {
        hasFullData = false;
      }
    }
    if (!isDnf) {
      if (attemptData?.finish && attemptData?.start) {
        const startSeconds = this.toSeconds(attemptData?.start);
        const finishSeconds = this.toSeconds(attemptData?.finish);
        const seconds = finishSeconds - startSeconds;
        scores = {
          seconds,
          total: seconds + penalty,
          timeString: this.secondsToString(seconds),
          totalString: this.secondsToString(seconds + penalty),
        };
      } else {
        hasFullData = false;
      }
    }

    return {
      judgeData: attemptData,
      hasFullData,
      isDnf,
      penalty,
      ...scores,
    } as CalculatedAttemptResults;
  }

  @Selector([JudgementState, ParticipantsSelectors.byNumber, SettingsState])
  static allResults(
    state: JudgementStateModel,
    participantSelector: (participantNumber: number) => Participant,
    settings: SettingsStateModel
  ): ParticipantResult[] {
    const participantResults: ParticipantResult[] = Object.getOwnPropertyNames(
      state
    ).map((x) => {
      const participantNumber = Number(x);
      const judgementData = state[participantNumber];
      const calculatedAttempts: CalculatedAttemptResults[] =
        settings.attempts.map(({ code }) =>
          this.calculateSingleAttempt(judgementData[code], settings.gates)
        );

      const attemptMetrics = calculatedAttempts.map((a) => ({
        total: a.total,
        penalty: a.penalty,
      }));
      attemptMetrics.sort((a, b) => a.total - b.total);
      const comparables = attemptMetrics.reduce((c, m, idx, arr) => {
        c.push(m.total);
        c.push(m.penalty);
        return c;
      }, []);

      return {
        participantNumber,
        participantData: participantSelector(participantNumber) ?? {
          name: 'Незарегистрирован',
        },
        attempts: calculatedAttempts,
        comparables,
        bestTotal:
          attemptMetrics.length > 0
            ? this.secondsToString(attemptMetrics[0].total)
            : '',
      } as ParticipantResult;
    });

    participantResults.sort((a, b) => {
      for (let i = 0; i < a.comparables.length; i++) {
        if (a.comparables[i] !== b.comparables[i]) {
          return a.comparables[i] - b.comparables[i];
        }
      }
      return 0;
    });

    participantResults.forEach((x, idx) => (x.place = idx + 1));

    return participantResults;
  }

  @Selector([JudgementState, ParticipantsSelectors.byNumber, SettingsState])
  static allResultsJson(
    state: JudgementStateModel,
    participantSelector: (participantNumber: number) => Participant,
    settings: SettingsStateModel
  ): string {
    const participantResults = this.allResults(
      state,
      participantSelector,
      settings
    );
    return JSON.stringify(participantResults);
  }

  @Selector([JudgementState, ParticipantsSelectors.byNumber, SettingsState])
  static allResultsTable(
    state: JudgementStateModel,
    participantSelector: (participantNumber: number) => Participant,
    settings: SettingsStateModel
  ): ResultTableRowData[] {
    const participantResults = this.allResults(
      state,
      participantSelector,
      settings
    );
    const tableResults = participantResults.reduce((t, r, idx, arr) => {
      const { attempts, comparables, ...otherData } = r;
      for (let i = 0; i < attempts.length; i++) {
        if (i === 0) {
          t.push({
            attempt: attempts[i],
            rowSpan: attempts.length,
            ...otherData,
          });
        } else {
          t.push({ attempt: attempts[i], rowSpan: 0 });
        }
      }

      return t;
    }, [] as ResultTableRowData[]);
    return tableResults;
  }
}

export class CalculatedAttemptResults {
  judgeData: SingleAttemptResults;
  seconds?: number;
  penalty?: number;
  total?: number;
  timeString: string;
  totalString: string;
  isDnf: boolean;
  hasFullData: boolean;
}

export class ParticipantResult {
  place: number;
  bestTotal: string;
  participantNumber: number;
  participantData: Participant;
  attempts: CalculatedAttemptResults[];
  /** числа для сравнения в порядке важности -
   * результат лучшей попытки, штраф лучшей попытки, резултат другой попытки, штраф
   */
  comparables: number[];
}

export class ResultTableRowData {
  place?: number;
  bestTotal?: string;
  participantNumber?: number;
  participantData?: Participant;
  rowSpan: number;
  attempt: CalculatedAttemptResults;
}
