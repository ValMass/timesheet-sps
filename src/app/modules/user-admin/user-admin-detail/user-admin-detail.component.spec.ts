import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAdminDetailComponent } from './user-admin-detail.component';

describe('UserAdminDetailComponent', () => {
  let component: UserAdminDetailComponent;
  let fixture: ComponentFixture<UserAdminDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAdminDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAdminDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
