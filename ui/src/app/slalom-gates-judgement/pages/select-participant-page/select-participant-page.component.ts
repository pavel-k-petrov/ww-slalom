import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { GoToJudgement } from '@app/slalom-gates-judgement/store/slalom-gates-judgement.actions';
import { CompetitionFlowSelectors } from '@app/store/competition-flow/competition-flow.selectors';
import { Select, Selector, Store } from '@ngxs/store';
import {
  BehaviorSubject,
  combineLatest,
  merge,
  Observable,
  Subject,
} from 'rxjs';
import { filter, map, startWith, switchMap, tap, withLatestFrom } from 'rxjs/operators';

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
  @Select(SlalomGateJudgementSelectors.recomendedForJudge)
  recommendedForJudge$: Observable<ParticipantForJudgement[]>;

  numberControl = new FormControl();
  judgeId$: Observable<string>;
  currentAttempt$: Observable<{ code: string; title: string }>;
  participantByNumber$: Observable<ParticipantForJudgement>;

  selectedParticipantNumber$: Subject<string> = new Subject<string>();

  constructor(private store: Store, private cdf: ChangeDetectorRef) {
    this.judgeId$ = store
      .select(SlalomGateJudgementSelectors.currentJudgeFromRoute)
      .pipe(filter(x => !!x), map((x) => x.title));
    this.currentAttempt$ = store.select(
      CompetitionFlowSelectors.currentAttempt
    );

    this.participantByNumber$ = combineLatest([
      this.numberControl.valueChanges,
      this.currentAttempt$,
      store.select(SlalomGateJudgementSelectors.participantByNumber),
    ]).pipe(
      map(([enteredValue, currentAttempt, participantSelector]) => {
        if (!enteredValue) {
          return null;
        }

        const participant: ParticipantForJudgement =
          participantSelector(enteredValue);
        return {
          ...participant,
          attemptCode: currentAttempt?.code,
        };
      })
    );
  }

  ngOnInit(): void {}

  gotoParticipantByNumberJudgement(participant: ParticipantForJudgement): void {
    this.store.dispatch(
      new GoToJudgement(participant.participantNumber, participant.attemptCode)
    );
  }
}
