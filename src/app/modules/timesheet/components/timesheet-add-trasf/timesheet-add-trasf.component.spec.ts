import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetAddTrasfComponent } from './timesheet-add-trasf.component';

describe('TimesheetAddTrasfComponent', () => {
  let component: TimesheetAddTrasfComponent;
  let fixture: ComponentFixture<TimesheetAddTrasfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimesheetAddTrasfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesheetAddTrasfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
