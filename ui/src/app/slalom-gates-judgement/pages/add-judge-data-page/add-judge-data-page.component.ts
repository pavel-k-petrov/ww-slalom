import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { GoToJudgementAdjustment } from '@app/slalom-gates-judgement/store/slalom-gates-judgement.actions';
import { GateResult } from '@app/store/judgement/judgement.actions';
import { JudgementItemType } from '@app/store/models';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SlalomGateJudgementSelectors } from '../../store/slalom-gates-judgement.selectors';

type JudgableForm = {
  itemTypes: JudgementItemType[];
};

@Component({
  selector: 'app-add-judge-data-page',
  templateUrl: './add-judge-data-page.component.html',
  styleUrls: ['./add-judge-data-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddJudgeDataPageComponent implements OnInit {
  id$: Observable<string>;
  participantShortInfo$: Observable<string>;
  judgeForm$: Observable<JudgableForm>;
  currentItemIndex: number;
  scores = {};

  constructor(private store: Store, private cdf: ChangeDetectorRef) {
    this.participantShortInfo$ = this.store
      .select(SlalomGateJudgementSelectors.currentParticipantFromRoute)
      .pipe(map((participant) => participant.shortInfo));
    this.judgeForm$ = this.store
      .select(SlalomGateJudgementSelectors.currentJudgeFromRoute)
      .pipe(
        map((judge) => this.createFormControl(judge?.judgementItems ?? []))
      );
  }

  ngOnInit(): void {
    this.currentItemIndex = 0;
  }

  createFormControl(itemTypes: JudgementItemType[]): JudgableForm {
    const form: JudgableForm = {
      itemTypes,
    };
    return form;
  }

  judgableItemTrackBy(index: number, item: JudgementItemType): string {
    return '' + item;
  }

  getScoresValue(): string {
    return JSON.stringify(this.scores);
  }

  onGateScored(
    itemType: JudgementItemType,
    isLast: boolean,
    result: GateResult
  ): void {
    this.scores[itemType] = result;
    this.currentItemIndex++;
    this.cdf.markForCheck();
    if (isLast) {
      this.store.dispatch(new GoToJudgementAdjustment());
    }
  }
}
