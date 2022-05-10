import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditJudgeDataPageComponent } from './edit-judge-data-page.component';

describe('EditJudgeDataPageComponent', () => {
  let component: EditJudgeDataPageComponent;
  let fixture: ComponentFixture<EditJudgeDataPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditJudgeDataPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditJudgeDataPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
