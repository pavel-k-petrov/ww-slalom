import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CompetitionFlowPageComponent } from './pages/competition-flow-page/competition-flow-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'competition-flow',
  },
  { path: 'competition-flow', component: CompetitionFlowPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagementRoutingModule {}
