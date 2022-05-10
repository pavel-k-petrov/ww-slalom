import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GateItemResultComponent } from './gate-item-result.component';

describe('GateItemResultComponentComponent', () => {
  let component: GateItemResultComponent;
  let fixture: ComponentFixture<GateItemResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GateItemResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GateItemResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
