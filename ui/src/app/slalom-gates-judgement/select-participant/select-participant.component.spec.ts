import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectParticipantComponent } from './select-participant.component';

describe('SelectParticipantComponent', () => {
  let component: SelectParticipantComponent;
  let fixture: ComponentFixture<SelectParticipantComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectParticipantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
