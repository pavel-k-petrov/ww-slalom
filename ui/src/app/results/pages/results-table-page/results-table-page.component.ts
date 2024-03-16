import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ResultTableRowData, ResultsSelectors } from '@app/results/store/results.selectors';
import { SettingsSelectors } from '@app/store/settings/settings.selectors';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-results-table-page',
  templateUrl: './results-table-page.component.html',
  styleUrls: ['./results-table-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsTablePageComponent implements OnInit {
  @Select(ResultsSelectors.allResultsJson)
  stateDebug$: Observable<string>;

  @Select(ResultsSelectors.allResultsTable)
  results$: Observable<ResultTableRowData[]>;

  @Select(SettingsSelectors.gates)
  gates$: Observable<number[]>;

  constructor() {}

  ngOnInit(): void {}

  getColumnNames(gates: number[]): string[] {
    const gateColumns = gates.map(x => 'gate' + x);
    const names = ['number', 'name', 'category', 'start', ...gateColumns, 'finish', 'penalty', 'total', 'place'];
    return names;
  }
}
