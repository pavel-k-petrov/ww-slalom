import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-gate-item-result',
  templateUrl: './gate-item-result.component.html',
  styleUrls: ['./gate-item-result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GateItemResultComponent implements OnInit {
  @Input()
  gateNumber: number;

  @Input()
  disabled: boolean;

  @Input()
  value: 0 | 2 | 50 | 'DNF';

  possibleValues = [0, 2, 50, 'DNF'];
  formControl = new FormControl();

  constructor() { }

  ngOnInit(): void {
    // this.formControl.setValue(2);
    // this.formControl.disable();
  }

}
