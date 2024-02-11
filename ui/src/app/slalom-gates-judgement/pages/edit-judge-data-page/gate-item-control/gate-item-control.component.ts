import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { GateResult } from '@app/store/judgement/judgement.actions';

@Component({
  selector: 'app-gate-item-control',
  templateUrl: './gate-item-control.component.html',
  styleUrls: ['./gate-item-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GateItemControlComponent implements OnInit {
  @Input()
  gateNumber: number;

  @Input()
  score: GateResult;

  @Output()
  valueSelected = new EventEmitter<GateResult>();

  controlClass = 'disabled';

  possibleValues = [0, 2, 50, 'DNF'];

  constructor() { }

  ngOnInit(): void {
  }

  scoreButtonClicked(score: GateResult) {
    this.valueSelected.emit(score);
  }
}
