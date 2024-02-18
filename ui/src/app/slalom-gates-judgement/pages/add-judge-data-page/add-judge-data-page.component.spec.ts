import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJudgeDataPageComponent } from './add-judge-data-page.component';

describe('AddJudgeDataPageComponent', () => {
  let component: AddJudgeDataPageComponent;
  let fixture: ComponentFixture<AddJudgeDataPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddJudgeDataPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddJudgeDataPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
