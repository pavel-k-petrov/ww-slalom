import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Participant } from '@app/store/participants/participants-state-model';
import { AddOrUpdateParticipant } from '@app/store/participants/participants.actions';
import { ParticipantsSelectors } from '@app/store/participants/participants.selectors';
import { SettingsSelectors } from '@app/store/settings/settings.selectors';
import { Select, Store } from '@ngxs/store';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-edit-participant-page',
  templateUrl: './edit-participant-page.component.html',
  styleUrls: ['./edit-participant-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditParticipantPageComponent implements OnInit {
  @Select(SettingsSelectors.groups)
  groups$: Observable<string[]>;

  foundByNumber$: Observable<Participant>;
  form: FormGroup;

  constructor(private store: Store, private snackBar: MatSnackBar) {
    const numberControl = new FormControl(null, [Validators.required]);
    this.form = new FormGroup({
      participantNumber: numberControl,
      name: new FormControl(null, [Validators.required]),
      group: new FormControl(null, [Validators.required]),
    });

    this.foundByNumber$ = combineLatest([
      numberControl.valueChanges,
      store.select(ParticipantsSelectors.byNumber),
    ]).pipe(
      map(([enteredValue, participantSelector]) => {
        const num = Number(enteredValue);
        if (Number.isNaN(num)) {
          return null;
        }

        return participantSelector(num);
      })
    );
  }

  ngOnInit(): void {}

  onSubmit(form: FormGroup, isReplacement?: boolean): void {
    const { participantNumber, ...participantData } = form.value;
    this.store.dispatch(
      new AddOrUpdateParticipant(Number(participantNumber), participantData)
    );
    form.reset();
    if (isReplacement) {
      this.snackBar.open(`Номер ${participantNumber} заменён`, null, {duration: 2000});
    } else {
      this.snackBar.open(`Номер ${participantNumber} зарегистрирован`, null, {duration: 2000});
    }
  }
}
