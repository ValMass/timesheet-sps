import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAdminNewPasswordComponent } from './user-admin-new-password.component';

describe('UserAdminNewPasswordComponent', () => {
  let component: UserAdminNewPasswordComponent;
  let fixture: ComponentFixture<UserAdminNewPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAdminNewPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAdminNewPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
