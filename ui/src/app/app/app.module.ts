import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule  } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CopmetitionFlowState } from '@app/store/competition-flow/competition-flow.state';
import { NavigationState } from '@app/store/navigation/navigation.state';
import { SettingsState } from '@app/store/settings/settings.state';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsModule } from '@ngxs/store';
import { NgxMaskModule } from 'ngx-mask';
import { environment } from 'src/environments/environment';

import { JudgementState } from '../store/judgement/judgement.state';
import { ParticipantsState } from '../store/participants/participants.state';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './pages/app/app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    NgxsModule.forRoot(
      [SettingsState, CopmetitionFlowState, ParticipantsState, JudgementState, NavigationState],
      { developmentMode: !environment.production }
    ),
    NgxsRouterPluginModule.forRoot(),
    NgxMaskModule.forRoot({
      validation: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
