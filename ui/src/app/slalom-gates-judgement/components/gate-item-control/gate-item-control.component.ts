import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { GateResult } from '@app/store/models';

@Component({
  selector: 'app-gate-item-control',
  templateUrl: './gate-item-control.component.html',
  styleUrls: ['./gate-item-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: GateItemControlComponent,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: GateItemControlComponent,
    },
  ],
})
export class GateItemControlComponent implements OnInit, ControlValueAccessor, Validator {
  @Input()
  gateNumber: number;

  @Input()
  score?: GateResult;

  @Input()
  disabled: boolean;

  @Output()
  valueSelected = new EventEmitter<GateResult>();

  possibleValues = [0, 2, 50, 'DNF'];

  touched = false;
  isReactive = false;

  constructor() { }

  onChange = (value) => {};

  onTouched = () => {};

  ngOnInit(): void {
  }

  scoreButtonClicked(score: GateResult) {
    if (this.isReactive) {
      this.score = score;
      this.markAsTouched();
      this.onChange(score);
      return;
    }

    this.valueSelected.emit(score);
  }

  writeValue(score: GateResult): void {
    this.isReactive = true;
    this.score = score;
  }

  registerOnChange(onChange: any) {
    this.isReactive = true;
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.isReactive = true;
    this.onTouched = onTouched;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  validate(control: AbstractControl): ValidationErrors {
    if (this.score === 0 || this.score) {
      return;
    }

    const errors: ValidationErrors = { error: 'ошибка' };
    return errors;
  }
}
