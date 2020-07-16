import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'slalom/gates',
    loadChildren: () => import('./slalom-gates-judgement/slalom-gates-judgement.module').then(mod => mod.SlalomGatesJudgementModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
