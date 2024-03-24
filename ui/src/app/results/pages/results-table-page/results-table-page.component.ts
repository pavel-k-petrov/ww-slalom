import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { SetGroupForResultsTable } from '@app/results/store/results.actions';
import { ResultTableRowData, ResultsSelectors } from '@app/results/store/results.selectors';
import { SettingsSelectors } from '@app/store/settings/settings.selectors';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-results-table-page',
  templateUrl: './results-table-page.component.html',
  styleUrls: ['./results-table-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsTablePageComponent implements OnInit {
  @Select(ResultsSelectors.resultsJson)
  stateDebug$: Observable<string>;

  @Select(ResultsSelectors.resultsTable)
  results$: Observable<ResultTableRowData[]>;

  @Select(SettingsSelectors.gates)
  gates$: Observable<number[]>;

  @Select(ResultsSelectors.availableGroups)
  groups$: Observable<{title: string; code: string}[]>;

  @Select(ResultsSelectors.selectedGroup)
  selectedGroup$: Observable<string>;

  constructor(private store: Store) {}

  ngOnInit(): void {}

  getColumnNames(gates: number[]): string[] {
    const gateColumns = gates.map(x => 'gate' + x);
    const names = ['number', 'name', 'category', 'start', ...gateColumns, 'finish', 'penalty', 'total', 'best', 'place', 'warning'];
    return names;
  }

  onSelectedGroupChange(event: MatRadioChange): void {
    this.store.dispatch(new SetGroupForResultsTable(event.value));
  }
}
