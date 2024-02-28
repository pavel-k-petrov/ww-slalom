import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SlalomGateJudgementSelectors } from '@app/slalom-gates-judgement/store/slalom-gates-judgement.selectors';
import { GateResult } from '@app/store/judgement/judgement.actions';
import { JudgementItemType } from '@app/store/models';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
  id$: Observable<string>;
  participantShortInfo$: Observable<string>;
  judgeForm$: Observable<JudgableForm>;
  currentItemIndex: number;
  currentValues: { [key in JudgementItemType]?: any } = {};
  scores = { 1: 2 };

  constructor(private store: Store, private cdf: ChangeDetectorRef) {
    this.participantShortInfo$ = this.store
      .select(SlalomGateJudgementSelectors.currentParticipantFromRoute)
      .pipe(map((participant) => participant.shortInfo));
    this.judgeForm$ = this.store
      .select(SlalomGateJudgementSelectors.currentJudgeFromRoute)
      .pipe(
        map((judge) => this.createFormControl(judge?.judgementItems ?? []))
      );
  }

  ngOnInit(): void {
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
