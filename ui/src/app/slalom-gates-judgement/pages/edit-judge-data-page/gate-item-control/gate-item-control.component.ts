import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

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
  control: FormControl;

  controlClass = 'disabled';

  possibleValues = [0, 2, 50, 'DNF'];

  constructor() { }

  ngOnInit(): void {
  }
}
