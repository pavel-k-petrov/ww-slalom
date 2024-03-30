import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionFlowPageComponent } from './competition-flow-page.component';

describe('CompetitionFlowPageComponent', () => {
  let component: CompetitionFlowPageComponent;
  let fixture: ComponentFixture<CompetitionFlowPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetitionFlowPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionFlowPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
