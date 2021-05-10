import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetAddTrasfV2Component } from './timesheet-add-trasf-v2.component';

describe('TimesheetAddTrasfV2Component', () => {
  let component: TimesheetAddTrasfV2Component;
  let fixture: ComponentFixture<TimesheetAddTrasfV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimesheetAddTrasfV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesheetAddTrasfV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
