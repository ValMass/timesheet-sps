import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetComponentComponent } from './timesheet-component.component';

describe('TimesheetComponentComponent', () => {
  let component: TimesheetComponentComponent;
  let fixture: ComponentFixture<TimesheetComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimesheetComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesheetComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
