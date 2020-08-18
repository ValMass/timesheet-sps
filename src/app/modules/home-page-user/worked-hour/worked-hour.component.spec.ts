import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkedHourComponent } from './worked-hour.component';

describe('WorkedHourComponent', () => {
  let component: WorkedHourComponent;
  let fixture: ComponentFixture<WorkedHourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkedHourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkedHourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
