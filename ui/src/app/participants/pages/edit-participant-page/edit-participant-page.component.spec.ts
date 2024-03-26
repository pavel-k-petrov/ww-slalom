import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditParticipantPageComponent } from './edit-participant-page.component';

describe('EditParticipantPageComponent', () => {
  let component: EditParticipantPageComponent;
  let fixture: ComponentFixture<EditParticipantPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditParticipantPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditParticipantPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
