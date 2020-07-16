import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SelectParticipantComponent } from './select-participant';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'participant',
      },
      {
        path: 'participant',
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
