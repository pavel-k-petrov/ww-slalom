import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CopmetitionFlowState } from '@app/store/competition-flow/competition-flow.state';
import { SettingsState } from '@app/store/settings/settings.state';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsModule } from '@ngxs/store';
import { NgxMaskModule } from 'ngx-mask';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JudgementState } from './store/judgement/judgement.state';
import { ParticipantsState } from './store/participants/participants.state';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    NgxsModule.forRoot(
      [SettingsState, CopmetitionFlowState, ParticipantsState, JudgementState],
      { developmentMode: !environment.production }),
    NgxsRouterPluginModule.forRoot(),
    NgxMaskModule.forRoot({
      validation: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
