import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetAddEventComponent } from './timesheet-add-event.component';

describe('TimesheetAddEventComponent', () => {
  let component: TimesheetAddEventComponent;
  let fixture: ComponentFixture<TimesheetAddEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimesheetAddEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesheetAddEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
