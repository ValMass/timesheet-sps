import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAdminCalendarComponent } from './user-admin-calendar.component';

describe('UserAdminCalendarComponent', () => {
  let component: UserAdminCalendarComponent;
  let fixture: ComponentFixture<UserAdminCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAdminCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAdminCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
