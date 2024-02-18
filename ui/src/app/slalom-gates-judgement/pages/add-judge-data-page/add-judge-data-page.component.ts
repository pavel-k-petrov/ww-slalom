import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RouterStateSnapshot } from '@angular/router';
import { GoToJudgementAdjustment } from '@app/slalom-gates-judgement/store/slalom-gates-judgement.actions';
import { GateResult } from '@app/store/judgement/judgement.actions';
import { JudgementItemType } from '@app/store/models';
import { RouterState, RouterStateModel } from '@ngxs/router-plugin';
import { Store } from '@ngxs/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';

import { exampleParticipants, Participant } from '../../models';

type JudgableForm = {
  itemTypes: JudgementItemType[];
};

@Component({
  selector: 'app-add-judge-data-page',
  templateUrl: './add-judge-data-page.component.html',
  styleUrls: ['./add-judge-data-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddJudgeDataPageComponent implements OnInit {
  allParticipants$: BehaviorSubject<Participant[]> = new BehaviorSubject<
    Participant[]
  >([]);
  id$: Observable<string>;
  participantShortInfo$: Observable<string>;
  judgeForm$: BehaviorSubject<JudgableForm> =
    new BehaviorSubject<JudgableForm>({
      itemTypes: [],
    });
  currentItemIndex: number;
  scores = {};

  constructor(
    private store: Store,
    private cdf: ChangeDetectorRef) {
    this.participantShortInfo$ = this.store.select(RouterState).pipe(
      map((routeState: RouterStateModel) => {
        const routerSnapshot: RouterStateSnapshot = routeState.state;
        let node = routerSnapshot.root;
        while (node.firstChild) {
          node = node.firstChild;
        }
        return node.params.id;
      }),
      withLatestFrom(this.allParticipants$),
      map(([id, participants]) => {
        const participant: Participant = participants.find(
          (x) => x.participantNumber === id
        );
        return participant
          ? participant.shortInfo
          : id + ' - незарегистрирован';
      })
    );
  }

  ngOnInit(): void {
    this.allParticipants$.next(exampleParticipants);
    this.judgeForm$.next(this.createFormControl([1, 2]));
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

  onGateScored(itemType: JudgementItemType, isLast: boolean, result: GateResult): void {
    this.scores[itemType] = result;
    this.currentItemIndex++;
    this.cdf.markForCheck();
    if (isLast){
      this.store.dispatch(new GoToJudgementAdjustment());
    }
  }
}
