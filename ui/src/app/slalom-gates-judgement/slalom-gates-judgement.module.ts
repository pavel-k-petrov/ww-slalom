/**
 * Рабочее место судьи на воротах, обеспечивает выбор участника, попытки и ввод результатов на воротах либо на часах для данной попытки
 *
 * модуль не должен загружаться (Guard) для пользователей без соответствующей роли
 *
 * Выбор попытки должен учитывать текущую попытку и предлагать переход при изменении
 *
 * Выбор участника должен
 *  - отображать данные участника
 *  - (опционально) выбирать по фамилии
 *  - выбирать по номеру (ручной ввод с подсказкой)
 *  - предлагать выбрать участников с предыдущей связки
 *
 * Ввод данных
 *  - два режима - ввод построчно, ввод данных по всем воротам (режим формы)
 *  - после построчного ввода по последним воротам переходить на режим формы для проверки
 *  - после проверки, отправить изменившиеся данные и вернуться на выбор участника
 *  - ввод часов (старт финиш), учитывать формат из настроек - часы-минуты-секунды, просто секунды (узнать какие ещё таймеры бывают)
 *  - (опц) на часах запоминать последнее введённое значение
 *  - (опц) устанавливать блокировку на группу ворот при вводе данных
 *  - (опц) отображать изменения со стороны с инфой об изменившем
 *  - данные должны включать метаинфу - время и текущего пользователя
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { } from '@angular/material/';

import { SlalomGatesJudgementRoutingModule } from './slalom-gates-judgement-routing.module';
import { SelectParticipantPageComponent } from './pages/select-participant-page/select-participant-page.component';
import { EditJudgeDataPageComponent } from './pages/edit-judge-data-page/edit-judge-data-page.component';
import { GateItemResultComponent } from './pages/edit-judge-data-page/gate-item-result/gate-item-result.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SlalomGatesJudgementRoutingModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatBadgeModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatCardModule,
    MatChipsModule,
    MatButtonToggleModule
  ],
  declarations: [SelectParticipantPageComponent, EditJudgeDataPageComponent, GateItemResultComponent]
})
export class SlalomGatesJudgementModule { }
