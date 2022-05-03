import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SelectParticipantComponent } from './pages/select-participant-page/select-participant';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'select-participant',
      },
      {
        path: 'select-participant',
        component: SelectParticipantComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SlalomGatesJudgementRoutingModule { }
