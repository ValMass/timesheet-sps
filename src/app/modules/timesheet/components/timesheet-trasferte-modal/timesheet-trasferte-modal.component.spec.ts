import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetTrasferteModalComponent } from './timesheet-trasferte-modal.component';

describe('TimesheetTrasferteModalComponent', () => {
  let component: TimesheetTrasferteModalComponent;
  let fixture: ComponentFixture<TimesheetTrasferteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimesheetTrasferteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesheetTrasferteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
