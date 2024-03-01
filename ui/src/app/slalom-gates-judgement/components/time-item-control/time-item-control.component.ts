import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  OnDestroy,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-time-item-control',
  templateUrl: './time-item-control.component.html',
  styleUrls: ['./time-item-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: TimeItemControlComponent,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: TimeItemControlComponent,
    },
  ],
})
export class TimeItemControlComponent
  implements OnInit, OnDestroy, ControlValueAccessor, Validator
{
  @Input()
  title: string;

  subscription: Subscription;

  timeForm = new FormGroup({
    hour: new FormControl('00', [
      Validators.required,
      Validators.min(0),
      Validators.max(23),
    ]),
    minute: new FormControl('00', [
      Validators.required,
      Validators.min(0),
      Validators.max(59),
    ]),
    second: new FormControl('00', [
      Validators.required,
      Validators.min(0),
      Validators.max(59),
    ]),
  });

  touched = false;

  onChange = (value) => {};

  onTouched = () => {};

  ngOnInit(): void {
    this.subscription = this.timeForm.valueChanges.subscribe((value) => {
      this.markAsTouched();
      this.onChange(`${value?.hour}:${value?.minute}:${value?.second}`);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  writeValue(obj: string): void {
    if (!obj || typeof obj !== 'string' && (obj as any) instanceof String) {
      this.timeForm.setValue({
        hour: null,
        minute: null,
        second: null,
      });
      return;
    }

    const parts = obj.split(':', 3);
    this.timeForm.setValue({
      hour: parts[0],
      minute: parts[1],
      second: parts[2],
    });
    this.timeForm.markAllAsTouched();
    this.timeForm.controls.hour.markAsTouched();
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.timeForm.disable();
    } else {
      this.timeForm.enable();
    }
  }

  validate(control: AbstractControl): ValidationErrors {
    if (this.timeForm.valid) {
      return;
    }

    const errors: ValidationErrors = { error: 'ошибка' };
    return errors;
  }
}
