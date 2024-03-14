import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ResultsTablePageComponent } from './pages/results-table-page/results-table-page.component';

const routes: Routes = [{ path: '', component: ResultsTablePageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultsRoutingModule { }
