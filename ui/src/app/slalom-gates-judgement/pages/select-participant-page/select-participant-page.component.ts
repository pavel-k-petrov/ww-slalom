import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { GoToJudgement } from '@app/slalom-gates-judgement/store/slalom-gates-judgement.actions';
import { CompetitionFlowSelectors } from '@app/store/competition-flow/competition-flow.selectors';
import { Participant } from '@app/store/participants/participants-state-model';
import { ParticipantsSelectors } from '@app/store/participants/participants.selectors';
import { SettingsSelectors } from '@app/store/settings/settings.selectors';
import { Store } from '@ngxs/store';
import {
  BehaviorSubject,
  combineLatest,
  merge,
  Observable,
  Subject,
} from 'rxjs';
import { map, startWith, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import { ParticipantForJudgement } from '../../store/models/participant-for-judgement';
import { SlalomGateJudgementSelectors } from '../../store/slalom-gates-judgement.selectors';

/**
 * страница выбора участника для ввода информации по связке ворот для одного судьи
 *
 * выбрать номер участника и сделать переход на ввод данных по связке
 *
 * отображение данных введённого участника
 * отображение подсказок при прямом наборе номера
 * отображение подходящих номеров из категорий:
 * - номера, по которым есть данные текущей попытки от других судей, но нет наших данных
 */
@Component({
  selector: 'app-select-participant-page',
  templateUrl: './select-participant-page.component.html',
  styleUrls: ['./select-participant-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectParticipantPageComponent implements OnInit {
  numberControl = new FormControl();
  attemptControl = new FormControl();
  judgeId$: Observable<string>;
  currentAttempt$: Observable<{ code: string; title: string }>;
  recommendedForJudge$: Observable<ParticipantForJudgement[]>;
  attempts$: Observable<{ code: string; title: string }[]>;
  participantByNumber$: Observable<{
    participantNumber: string;
    title: string;
    attemptCode?: string;
  }>;

  selectedParticipantNumber$: Subject<string> = new Subject<string>();
  selectedAttemptCode$: Subject<string> = new Subject<string>();

  constructor(private store: Store, private cdf: ChangeDetectorRef) {
    this.judgeId$ = store.select(SlalomGateJudgementSelectors.judgeIdFromRoute);
    this.currentAttempt$ = store.select(
      CompetitionFlowSelectors.currentAttempt
    );
    this.recommendedForJudge$ = store
      .select(SlalomGateJudgementSelectors.recomendedForJudge)
      .pipe(
        withLatestFrom(
          store.select(SlalomGateJudgementSelectors.judgeIdFromRoute)
        ),
        map(([selector, judgeId]) => selector(judgeId))
      );
    this.attempts$ = store.select(SettingsSelectors.attempts);

    this.participantByNumber$ = combineLatest([
      this.numberControl.valueChanges,
      this.currentAttempt$,
      store.select(ParticipantsSelectors.byNumber),
      this.attemptControl.valueChanges.pipe(startWith(null)),
    ]).pipe(
      map(
        ([
          enteredValue,
          currentAttempt,
          participantSelector,
          attemptSelection,
        ]) => {
          if (!enteredValue) {
            return null;
          }

          const participant: Participant = participantSelector(enteredValue);
          if (participant) {
            return {
              participantNumber: enteredValue,
              title: `${enteredValue} - ${participant.name} (${participant.group})`,
              attemptCode: attemptSelection ?? currentAttempt?.code,
            };
          }

          return {
            participantNumber: enteredValue,
            title: `${enteredValue} - Неизвестный участник`,
            attemptCode: currentAttempt?.code,
          };
        }
      )
      // tap((participant) =>{
      //   console.log(`new entered participant ${JSON.stringify(participant)}`);
      //   this.cdf.markForCheck();
      // }),
    );
  }

  ngOnInit(): void {}

  participantByNumberAttemptChange(attempt, event): void {
    console.log('attempt override!');
    console.log(JSON.stringify(attempt));
  }

  gotoParticipantByNumberJudgement(participant: {
    participantNumber: string;
    title: string;
    attemptCode?: string;
  }): void {
    console.log(
      `Go to judge participant number - ${participant.participantNumber}, attempt ${participant.attemptCode}`
    );
    this.store.dispatch(
      new GoToJudgement(participant.participantNumber, participant.attemptCode)
    );
  }

  selectRecomendedParticipant(participant: ParticipantForJudgement): void {
    this.numberControl.patchValue(participant.participantNumber);
  }
}
