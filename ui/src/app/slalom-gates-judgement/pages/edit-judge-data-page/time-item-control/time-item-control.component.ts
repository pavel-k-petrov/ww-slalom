import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-time-item-control',
  templateUrl: './time-item-control.component.html',
  styleUrls: ['./time-item-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeItemControlComponent implements OnInit {
  @Input()
  title: string;

  @Input()
  control: FormControl;

  constructor() { }

  ngOnInit(): void {
  }

}
