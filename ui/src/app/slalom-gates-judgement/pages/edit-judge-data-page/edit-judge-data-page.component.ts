import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RouterStateSnapshot } from '@angular/router';
import { JudgementItemType } from '@app/store/models';
import { RouterState, RouterStateModel } from '@ngxs/router-plugin';
import { Store } from '@ngxs/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';

import { exampleParticipants, Participant } from '../../models';
import { GateResult } from '@app/store/judgement/judgement.actions';


/**
 * ввод результатов участников по набору "судейских элементов" (старт-финищ-ворота)
 * 2 режима - "онлайн" и "корректировка"
 *
 * в режиме "онлайн" в один момент времени активен один элемент
 * после выбора результата по элементу, результат отправляется (на сервер)
 * и активируется следующий элемент
 * при вводе результата по последнему элементу активируется режим "корректировка"
 *
 * в режиме "корректировка" доступны для редактирования все элементы
 * и кнопка отправки результата (если что-то поменяли)
 *
 * ----------
 *
 * возможности - переключение режимов "онлайн-корректировка", переход на страницу выбора участника
 */

type JudgableForm = {
  formGroup: FormGroup;
  itemTypes: JudgementItemType[];
};

//TODO подумать насчёт разных компонент для режимов "онлайн" и "корректировка"
@Component({
  selector: 'app-edit-judge-data-page',
  templateUrl: './edit-judge-data-page.component.html',
  styleUrls: ['./edit-judge-data-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditJudgeDataPageComponent implements OnInit {
  allParticipants$: BehaviorSubject<Participant[]> = new BehaviorSubject<
    Participant[]
  >([]);
  id$: Observable<string>;
  participantShortInfo$: Observable<string>;
  judgeForm$: BehaviorSubject<JudgableForm> =
    new BehaviorSubject<JudgableForm>({
      formGroup: new FormGroup({}),
      itemTypes: [],
    });
  currentItemIndex: number;
  currentValues: { [key in JudgementItemType]?: any } = {};
  scores: {} = [];

  constructor(
    private store: Store,
    private cdf: ChangeDetectorRef) {
    this.participantShortInfo$ = this.store.select(RouterState).pipe(
      map((routeState: RouterStateModel) => {
        const routerSnapshot: RouterStateSnapshot = routeState.state;
        let node = routerSnapshot.root;
        while (node.firstChild) {
          node = node.firstChild;
        }
        return node.params.id;
      }),
      withLatestFrom(this.allParticipants$),
      map(([id, participants]) => {
        const participant: Participant = participants.find(
          (x) => x.participantNumber === id
        );
        return participant
          ? participant.shortInfo
          : id + ' - незарегистрирован';
      })
    );
  }

  ngOnInit(): void {
    this.allParticipants$.next(exampleParticipants);
    this.judgeForm$.next(this.createFormControl(['Start', 1, 2, 3, 4, 5, 'Finish']));
    // this.judgeForm$.next(this.createFormControl([1, 2, 3, 4, 5]));
    this.currentItemIndex = 0;
  }

  createFormControl(itemTypes: JudgementItemType[]): JudgableForm {
    const controls = itemTypes.reduce(
      (x: any, currentValue: JudgementItemType) => {
        x[currentValue] = new FormControl();
        return x;
      },
      {}
    );

    const form: JudgableForm = {
      formGroup: new FormGroup(controls),
      itemTypes,
    };
    return form;
  }

  judgableItemTrackBy(index: number, item: JudgementItemType): string {
    return '' + item;
  }

  setGateResult(item: number, penalty: number): void {
    this.currentValues[item] = penalty;
    this.currentItemIndex++;
  }

  getValue(form: JudgableForm): string {
    return JSON.stringify(form.formGroup.value);
  }
  getScoresValue(): string {
    return JSON.stringify(this.scores);
  }


  onGateScored(itemType: JudgementItemType, result: GateResult): void {
    this.scores[itemType] = result;
    this.cdf.markForCheck();
  }
}
