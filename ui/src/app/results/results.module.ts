import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { NgxsModule } from '@ngxs/store';

import { ResultsTablePageComponent } from './pages/results-table-page/results-table-page.component';
import { ResultsRoutingModule } from './results-routing.module';
import { ResultsState } from './store/results.state';

@NgModule({
  declarations: [ResultsTablePageComponent],
  imports: [
    CommonModule,
    ResultsRoutingModule,
    MatBadgeModule,
    MatRadioModule,
    MatTableModule,
    NgxsModule.forFeature([ResultsState]),
  ],
})
export class ResultsModule {}
