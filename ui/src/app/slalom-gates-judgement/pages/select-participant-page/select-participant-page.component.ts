import { Component, OnInit } from '@angular/core';

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
  styleUrls: ['./select-participant-page.component.scss']
})
export class SelectParticipantPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
