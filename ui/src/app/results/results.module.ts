import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

import { ResultsTablePageComponent } from './pages/results-table-page/results-table-page.component';
import { ResultsRoutingModule } from './results-routing.module';

@NgModule({
  declarations: [ResultsTablePageComponent],
  imports: [CommonModule, ResultsRoutingModule, MatTableModule],
})
export class ResultsModule {}