import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditParticipantPageComponent } from './pages/edit-participant-page/edit-participant-page.component';

const routes: Routes = [{ path: '', component: EditParticipantPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParticipantsRoutingModule { }
