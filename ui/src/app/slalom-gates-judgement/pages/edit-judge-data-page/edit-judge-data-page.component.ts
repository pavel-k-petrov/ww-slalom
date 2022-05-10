import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterStateSnapshot } from '@angular/router';
import { RouterState, RouterStateModel } from '@ngxs/router-plugin';
import { Store } from '@ngxs/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';

import { exampleParticipants, Participant } from '../../models';

export type JudgableItemType = 'Start' | 'Finish' | number;

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

//TODO подумать насчёт разных компонент для режимов "онлайн" и "корректировка"
@Component({
  selector: 'app-edit-judge-data-page',
  templateUrl: './edit-judge-data-page.component.html',
  styleUrls: ['./edit-judge-data-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditJudgeDataPageComponent implements OnInit {

  allParticipants$: BehaviorSubject<Participant[]> = new BehaviorSubject<Participant[]>([]);
  id$: Observable<string>;
  participantShortInfo$: Observable<string>;
  judgableItems$: BehaviorSubject<JudgableItemType[]> = new BehaviorSubject<JudgableItemType[]>([]);
  currentItemIndex: number;
  currentValues: { [key in JudgableItemType]?: any } = {};

  constructor(private store: Store) {
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
        const participant: Participant = participants.find(x => x.participantNumber === id);
        return participant ? participant.shortInfo : id + ' - незарегистрирован';
      }));
  }

  ngOnInit(): void {
    this.allParticipants$.next(exampleParticipants);
    // this.judgableItems$.next(['Start', 1, 2, 3, 4, 5, 'Finish']);
    this.judgableItems$.next([1, 2, 3, 4, 5]);
    this.currentItemIndex = 0;
  }

  judgableItemTrackBy(index: number, item: JudgableItemType): string {
    return '' + item;
  }

  setGateResult(item: number, penalty: number): void {
    this.currentValues[item] = penalty;
    this.currentItemIndex++;
  }
}

