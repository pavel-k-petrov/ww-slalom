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
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxsModule } from '@ngxs/store';
import { NgxMaskModule } from 'ngx-mask';

import { GateItemControlComponent } from './components/gate-item-control/gate-item-control.component';
import { TimeItemControlComponent } from './components/time-item-control/time-item-control.component';
import { AddJudgeDataPageComponent } from './pages/add-judge-data-page/add-judge-data-page.component';
import { EditJudgeDataPageComponent } from './pages/edit-judge-data-page/edit-judge-data-page.component';
import { ParticipantCardComponent } from './pages/select-participant-page/participant-card/participant-card.component';
import { SelectParticipantPageComponent } from './pages/select-participant-page/select-participant-page.component';
import { SlalomGatesJudgementRoutingModule } from './slalom-gates-judgement-routing.module';
import { SlalomGatesJudgementState } from './store/slalom-gates-judgement.state';

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
    MatButtonToggleModule,
    MatRadioModule,
    NgxMaskModule.forChild(),
    NgxsModule.forFeature([SlalomGatesJudgementState]),
  ],
  declarations: [
    SelectParticipantPageComponent,
    EditJudgeDataPageComponent,
    GateItemControlComponent,
    TimeItemControlComponent,
    AddJudgeDataPageComponent,
    ParticipantCardComponent,
  ],
})
export class SlalomGatesJudgementModule {}
