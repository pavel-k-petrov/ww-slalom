import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ResultsSelectors } from '@app/results/store/results.selectors';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-results-table-page',
  templateUrl: './results-table-page.component.html',
  styleUrls: ['./results-table-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultsTablePageComponent implements OnInit {
  @Select(ResultsSelectors.allResults)
  stateDebug$: Observable<string>;

  constructor() { }

  ngOnInit(): void {
  }

}
