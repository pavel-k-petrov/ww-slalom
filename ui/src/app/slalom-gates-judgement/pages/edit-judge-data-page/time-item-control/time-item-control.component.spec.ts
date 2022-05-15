import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeItemControlComponent } from './time-item-control.component';

describe('TimeItemControlComponent', () => {
  let component: TimeItemControlComponent;
  let fixture: ComponentFixture<TimeItemControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeItemControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeItemControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
