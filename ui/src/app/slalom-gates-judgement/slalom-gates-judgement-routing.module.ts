import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditJudgeDataPageComponent } from './pages/edit-judge-data-page/edit-judge-data-page.component';
import { SelectParticipantPageComponent } from './pages/select-participant-page/select-participant-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'sample-judge',
  },
  {
    path: ':judge-id',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'select-participant',
      },
      {
        path: 'select-participant',
        component: SelectParticipantPageComponent,
      },
      {
        path: ':attemptCode/:id',
        component: EditJudgeDataPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SlalomGatesJudgementRoutingModule { }
