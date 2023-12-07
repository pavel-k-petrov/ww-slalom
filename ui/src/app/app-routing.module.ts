import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'judgement',
  },
  {
    path: 'judgement',
    loadChildren: () => import('./slalom-gates-judgement/slalom-gates-judgement.module').then(mod => mod.SlalomGatesJudgementModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
