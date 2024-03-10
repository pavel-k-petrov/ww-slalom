import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import { ParticipantForJudgement } from '../../../store/models';

@Component({
  selector: 'app-participant-card',
  templateUrl: './participant-card.component.html',
  styleUrls: ['./participant-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParticipantCardComponent implements OnInit {
  @Input()
  participant: ParticipantForJudgement;

  @Output()
  actionButtonClick = new EventEmitter<ParticipantForJudgement>();

  constructor() {}

  ngOnInit(): void {}

  onJudgeButtonClick() {
    this.actionButtonClick.emit(this.participant);
  }
}
