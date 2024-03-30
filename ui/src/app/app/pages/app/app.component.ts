import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import {
  GoToJudgeByCode,
  GoToManagement,
  GoToRegistration,
  GoToResults,
} from '@app/store/navigation/navigation.actions';
import { SettingsSelectors } from '@app/store/settings/settings.selectors';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  @Select(SettingsSelectors.judgesList)
  judges$: Observable<{ code: string; title: string }>;

  @ViewChild('drawer')
  drawerRef: MatDrawer;

  title = 'Гребной слалом - Тьмацкий перекат';

  constructor(private store: Store) {}
  // TODO сделать отдельный компонент для навигации

  goToManagement(): void {
    this.store.dispatch(new GoToManagement());
    this.drawerRef.close();
  }
  goToResults(): void {
    this.store.dispatch(new GoToResults());
    this.drawerRef.close();
  }

  goToRegistration(): void {
    this.store.dispatch(new GoToRegistration());
    this.drawerRef.close();
  }

  goToJudgeByCode(judgeCode: string): void {
    this.store.dispatch(new GoToJudgeByCode(judgeCode));
    this.drawerRef.close();
  }
}
