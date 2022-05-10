import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { withLatestFrom, map } from 'rxjs/operators';

import { exampleParticipants, Participant } from '../../models';

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

  allParticipants$: BehaviorSubject<Participant[]> = new BehaviorSubject<Participant[]>([]);
  autocompleteOptions$: Observable<{ value: string; title: string }[]>;
  numberControl = new FormControl();

  constructor() {
    this.autocompleteOptions$ = this.numberControl.valueChanges.pipe(
      withLatestFrom(this.allParticipants$),
      map(([enteredValue, participants]) => {
        if (!enteredValue) {
          return [];
        }

        const filteredParticipants = participants
          .filter((p) => p.shortInfo.includes(enteredValue))
          .map((p) => ({
            value: p.participantNumber,
            title: p.shortInfo,
          }));

        return filteredParticipants;
      }));
  }

  ngOnInit(): void {
    this.allParticipants$.next(exampleParticipants);
  }
}

