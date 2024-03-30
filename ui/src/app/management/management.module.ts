import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule  } from '@angular/material/list';

import { ManagementRoutingModule } from './management-routing.module';
import { CompetitionFlowPageComponent } from './pages/competition-flow-page/competition-flow-page.component';


@NgModule({
  declarations: [
    CompetitionFlowPageComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    ManagementRoutingModule
  ]
})
export class ManagementModule { }
