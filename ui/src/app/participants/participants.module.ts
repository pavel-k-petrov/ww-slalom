import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxMaskModule } from 'ngx-mask';

import { EditParticipantPageComponent } from './pages/edit-participant-page/edit-participant-page.component';
import { ParticipantsRoutingModule } from './participants-routing.module';

/**
 * регистрация и редактирование участников
 *
 * сценарии основные:
 * - Оля полностью сама вводит данные участника и выданный номер
 * -- проверяется что номер свободен
 * - Оля хочет находить зарегистрированных участников по номеру или имени и редактировать их
 * -- Оля хочет редактировать данные участника кроме номера
 * -- Оля отбирает номер участника и выдаёт ему другой
 * - Оля хочет находить предрегистрацию участника по имени
 * -- создаёт участника на основе предрегистрации, с возможностью что-то поменять
 * -- если в предрегистрации был указан номер, проверяется его доступность
 * -- если по предрегистрации уже был зарегистрирован участник то это видно
 * -- если по предрегистрации уже был зарегистрирован участник то можно создать ещё, но с другим классом и номером
 *
 * сценарии дополнительные:
 * - Оля хочет знать сдал ли участник номер после соревнований
 * - Оля, Лена хочет видеть список номеров на руках участников
 * - Все хотят видеть список зарегистрированных участников с фильтрацией по группам и сортировкой по имени
 * - Оля хочет переходить на редактирование участника из списка зарегистрированных
 * - Все, Лена хотят видеть список предрегистрации с ссылкой на зарегистрированных (даже если их более одного)
 * - Оля хочет переходить на регистрацию или редактирование участника из списка предрегистрации
 * */

@NgModule({
  declarations: [
    EditParticipantPageComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ParticipantsRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSnackBarModule,
    NgxMaskModule,
  ]
})
export class ParticipantsModule { }
