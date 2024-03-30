import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SetCurrentAttempt } from '@app/store/competition-flow/competition-flow.actions';
import { CompetitionFlowSelectors } from '@app/store/competition-flow/competition-flow.selectors';
import { SettingsSelectors } from '@app/store/settings/settings.selectors';
import { Store } from '@ngxs/store';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-competition-flow-page',
  templateUrl: './competition-flow-page.component.html',
  styleUrls: ['./competition-flow-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompetitionFlowPageComponent implements OnInit {
  attemps$: Observable<{ title: string; isSelected: boolean }[]>;
  constructor(private store: Store) {
    this.attemps$ = combineLatest([
      store.select(CompetitionFlowSelectors.currentAttempt),
      store.select(SettingsSelectors.attempts),
    ]).pipe(
      map(([currentAttempt, attempts]) =>
        attempts?.map((x) => ({
          ...x,
          isSelected: currentAttempt.code === x.code,
        }))
      )
    );
  }

  ngOnInit(): void {}

  onSetCurrentAttempt(attempt: { code: string; title: string }): void {
    this.store.dispatch(new SetCurrentAttempt(attempt));
  }
}
