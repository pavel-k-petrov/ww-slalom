import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsTablePageComponent } from './results-table-page.component';

describe('ResultsTablePageComponent', () => {
  let component: ResultsTablePageComponent;
  let fixture: ComponentFixture<ResultsTablePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultsTablePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsTablePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
