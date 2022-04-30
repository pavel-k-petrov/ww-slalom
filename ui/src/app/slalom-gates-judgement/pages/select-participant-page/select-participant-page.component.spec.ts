import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectParticipantPageComponent } from './select-participant-page.component';

describe('SelectParticipantPageComponent', () => {
  let component: SelectParticipantPageComponent;
  let fixture: ComponentFixture<SelectParticipantPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectParticipantPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectParticipantPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
