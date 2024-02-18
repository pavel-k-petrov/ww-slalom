import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GateItemControlComponent } from './gate-item-control.component';

describe('GateItemControlComponent', () => {
  let component: GateItemControlComponent;
  let fixture: ComponentFixture<GateItemControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GateItemControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GateItemControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
